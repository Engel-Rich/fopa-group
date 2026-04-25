import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import type { IOrderRepository } from '../../../domain/repositories/order.repository.interface';
import type { IOrderItemRepository } from '../../../domain/repositories/order-item.repository.interface';
import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import type { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import type { ICustomerProductPriceRepository } from '../../../domain/repositories/customer-product-price.repository.interface';
import type { IStockMovementRepository } from '../../../domain/repositories/stock-movement.repository.interface';
import type { IPaymentRepository } from '../../../domain/repositories/payment.repository.interface';
import {
  NotFoundException,
  InsufficientStockException,
  InvalidOrderException,
} from '../../../shared/exceptions/business.exception';
import { CreateOrderDto } from '../../dtos/order/create-order.dto';
import { OrderResponseDto } from '../../dtos/order/order-response.dto';
import { Order, OrderStatus } from '../../../domain/entities/order.entity';
import { OrderItem } from '../../../domain/entities/order-item.entity';
import { StockMovement, StockMovementType } from '../../../domain/entities/stock-movement.entity';
import { Payment, PaymentMethod } from '../../../domain/entities/payment.entity';
import { OrderNumberGenerator } from '../../../shared/utils/order-number-generator';
import { PaymentReferenceGenerator } from '../../../shared/utils/payment-reference-generator';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
    @Inject('IOrderItemRepository')
    private readonly orderItemRepository: IOrderItemRepository,
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject('ICustomerProductPriceRepository')
    private readonly customerProductPriceRepository: ICustomerProductPriceRepository,
    @Inject('IStockMovementRepository')
    private readonly stockMovementRepository: IStockMovementRepository,
    @Inject('IPaymentRepository')
    private readonly paymentRepository: IPaymentRepository,
    private readonly dataSource: DataSource,
  ) { }

  async execute(dto: CreateOrderDto, userId: string): Promise<OrderResponseDto> {
    // Vérifier que le client existe
    const customer = await this.customerRepository.findById(dto.customerId);
    if (!customer) {
      throw new NotFoundException('Client');
    }

    if (!customer.isActive) {
      throw new InvalidOrderException('Le client est désactivé');
    }

    // Récupérer la dette actuelle du client
    const previousDebt = customer.currentDebt;

    // Vérifier les produits et calculer le subtotal
    let subtotal = 0;
    const orderItems: OrderItem[] = [];
    const stockMovements: StockMovement[] = [];

    for (const itemDto of dto.items) {
      const product = await this.productRepository.findById(itemDto.productId);
      if (!product) {
        throw new NotFoundException(`Produit avec l'ID ${itemDto.productId}`);
      }

      if (!product.isActive) {
        throw new InvalidOrderException(`Le produit ${product.name} est désactivé`);
      }

      if (product.quantity < itemDto.quantity) {
        throw new InsufficientStockException(product.name, product.quantity, itemDto.quantity);
      }

      const requestedUnitPrice = itemDto.unitPrice != null
        ? Number(itemDto.unitPrice)
        : Number(product.price);
      if (requestedUnitPrice <= 0) {
        throw new InvalidOrderException(`Prix unitaire invalide pour le produit ${product.name}`);
      }

      const itemSubtotal = requestedUnitPrice * itemDto.quantity;
      subtotal += itemSubtotal;

      // Créer l'order item (sans orderId pour l'instant)
      const orderItem = new OrderItem(
        '', // sera mis à jour après création de la commande
        itemDto.productId,
        product.name,
        itemDto.quantity,
        requestedUnitPrice,
      );
      orderItems.push(orderItem);

      // Créer le mouvement de stock (sans userId pour l'instant)
      const stockMovement = new StockMovement(
        itemDto.productId,
        StockMovementType.VENTE,
        itemDto.quantity,
        requestedUnitPrice,
        undefined,
        userId,
      );
      stockMovements.push(stockMovement);

      const existingConfig = await this.customerProductPriceRepository.findOne(dto.customerId, itemDto.productId);
      const referencePrice = existingConfig ? Number(existingConfig.unitPrice) : Number(product.price);
      if (Number(requestedUnitPrice) !== Number(referencePrice)) {
        await this.customerProductPriceRepository.upsert(
          dto.customerId,
          itemDto.productId,
          requestedUnitPrice,
        );
      }
    }

    const totalAmount = subtotal + previousDebt;

    if (subtotal <= 0) {
      throw new InvalidOrderException('Le montant total doit être supérieur à 0');
    }

    if (dto.amountPaid > totalAmount) {
      throw new InvalidOrderException(
        `Le montant payé (${dto.amountPaid}) ne peut pas être supérieur au total de la commande incluant la dette (${totalAmount})`
      );
    }

    // Utiliser une transaction pour garantir la cohérence
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Calculer le montant disponible pour la nouvelle commande après avoir payé les dettes
      let remainingAmountForNewOrder = dto.amountPaid;

      // Récupérer toutes les commandes impayées (PARTIALLY_PAID et PENDING)
      const unpaidOrders = await this.orderRepository.findUnpaidOrdersByCustomer(dto.customerId);

      // Trier par date de création (les plus anciennes en premier)
      unpaidOrders.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

      // Utiliser le montant payé pour finaliser les commandes impayées (dans l'ordre chronologique)
      for (const unpaidOrder of unpaidOrders) {
        if (remainingAmountForNewOrder <= 0) {
          break;
        }

        const amountNeeded = unpaidOrder.remainingDebt;
        if (amountNeeded > 0) {
          // Calculer le montant à payer pour cette commande (ne pas dépasser le montant disponible)
          const amountToPay = Math.min(amountNeeded, remainingAmountForNewOrder);

          // Créer un paiement pour cette commande
          const paymentReference = PaymentReferenceGenerator.generate(PaymentMethod.CASH);
          const payment = new Payment(
            unpaidOrder.id,
            amountToPay,
            PaymentMethod.CASH,
            userId,
            paymentReference,
          );
          await this.paymentRepository.create(payment);

          // Mettre à jour la commande
          unpaidOrder.addPayment(amountToPay);
          await this.orderRepository.update(unpaidOrder.id, {
            amountPaid: unpaidOrder.amountPaid,
            remainingDebt: unpaidOrder.remainingDebt,
            status: unpaidOrder.status,
          });

          // Décrémenter le montant disponible
          remainingAmountForNewOrder -= amountToPay;
        }
      }

      // Vérifier que le montant restant ne dépasse pas le totalAmount de la nouvelle commande
      if (remainingAmountForNewOrder > totalAmount) {
        throw new InvalidOrderException(
          `Le montant restant après paiement des dettes (${remainingAmountForNewOrder}) ne peut pas être supérieur au montant total de la commande (${totalAmount})`
        );
      }

      // amountGiven = montant donné par le client (ne change jamais)
      const amountGiven = dto.amountPaid;

      // amountPaid = montant effectivement payé pour cette commande
      // = montant restant après avoir payé les dettes précédentes + previousDebt
      // (car totalAmount = subtotal + previousDebt, donc si on paie previousDebt, c'est pour cette commande)
      const amountPaidForThisOrder = remainingAmountForNewOrder + previousDebt;

      // Créer la commande avec amountGiven et amountPaid
      const orderNumber = OrderNumberGenerator.generate();
      const order = new Order(
        orderNumber,
        dto.customerId,
        previousDebt,
        subtotal,
        userId,
        amountGiven,
        amountPaidForThisOrder,
        userId
      );
      const savedOrder = await this.orderRepository.create(order);

      // Créer les order items
      for (const item of orderItems) {
        item.orderId = savedOrder.id;
      }
      await this.orderItemRepository.createMany(orderItems);

      // Créer les mouvements de stock et mettre à jour les quantités
      for (const movement of stockMovements) {
        await this.stockMovementRepository.create(movement);
        await this.productRepository.updateStock(movement.productId, -movement.quantity);
      }

      // Si un montant reste pour la nouvelle commande, créer un paiement et mettre à jour le statut
      if (remainingAmountForNewOrder > 0) {
        // Générer une référence pour le paiement
        const paymentReference = PaymentReferenceGenerator.generate(PaymentMethod.CASH);

        // Créer le paiement avec le montant restant pour cette commande
        const payment = new Payment(
          savedOrder.id,
          remainingAmountForNewOrder,
          PaymentMethod.CASH,
          userId,
          paymentReference,
        );
        await this.paymentRepository.create(payment);

        // Récupérer la commande pour mettre à jour le statut
        const orderToUpdate = await this.orderRepository.findById(savedOrder.id);
        if (!orderToUpdate) {
          throw new NotFoundException('Commande');
        }

        // Déterminer le statut en fonction du montant payé
        let newStatus: OrderStatus;
        if (orderToUpdate.remainingDebt <= 0) {
          newStatus = OrderStatus.PAID;
        } else if (amountPaidForThisOrder > 0 && amountPaidForThisOrder < orderToUpdate.totalAmount) {
          newStatus = OrderStatus.PARTIALLY_PAID;
        } else {
          newStatus = OrderStatus.PENDING;
        }

        await this.orderRepository.update(savedOrder.id, {
          status: newStatus,
          amountPaid: amountPaidForThisOrder,
        });
      }

      // Mettre à jour la dette du client
      // Après avoir finalisé les commandes impayées, la dette du client est le remainingDebt de la nouvelle commande
      const finalOrder = await this.orderRepository.findById(savedOrder.id);
      if (!finalOrder) {
        throw new NotFoundException('Commande');
      }
      // La dette du client est maintenant le remainingDebt de la nouvelle commande
      // (car toutes les commandes impayées ont été finalisées avec le montant payé)
      await this.customerRepository.updateDebt(dto.customerId, finalOrder.remainingDebt);

      await queryRunner.commitTransaction();

      // Récupérer la commande complète
      const completeOrder = await this.orderRepository.findById(savedOrder.id);
      if (!completeOrder) {
        throw new NotFoundException('Commande');
      }

      return {
        id: completeOrder.id,
        orderNumber: completeOrder.orderNumber,
        customerId: completeOrder.customerId,
        previousDebt: completeOrder.previousDebt,
        subtotal: completeOrder.subtotal,
        totalAmount: completeOrder.totalAmount,
        amountGiven: completeOrder.amountGiven,
        amountPaid: completeOrder.amountPaid,
        remainingDebt: completeOrder.remainingDebt,
        packages: completeOrder.packages,
        packagesReturned: completeOrder.packagesReturned,
        remainingPackages: completeOrder.remainingPackages,
        status: completeOrder.status,
        userId: completeOrder.userId,

        createdBy: completeOrder.createdByUser ? {
          id: completeOrder.createdByUser.id,
          name: completeOrder.createdByUser.name,
          email: completeOrder.createdByUser.email,
          phone: completeOrder.createdByUser.phone,
          username: completeOrder.createdByUser.username,
          role: completeOrder.createdByUser.role,
          isActive: completeOrder.createdByUser.isActive,
          createdAt: completeOrder.createdByUser.createdAt,
          updatedAt: completeOrder.createdByUser.updatedAt,
        } : undefined,
        createdAt: completeOrder.createdAt,
        updatedAt: completeOrder.updatedAt,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  
}
