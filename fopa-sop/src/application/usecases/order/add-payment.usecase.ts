import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import type { IOrderRepository } from '../../../domain/repositories/order.repository.interface';
import type { IPaymentRepository } from '../../../domain/repositories/payment.repository.interface';
import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import { NotFoundException, InvalidOrderException } from '../../../shared/exceptions/business.exception';
import { AddPaymentDto } from '../../dtos/order/add-payment.dto';
import { PaymentResponseDto } from '../../dtos/order/payment-response.dto';
import { Payment, PaymentMethod } from '../../../domain/entities/payment.entity';
import { OrderStatus } from '../../../domain/entities/order.entity';
import { PaymentReferenceGenerator } from '../../../shared/utils/payment-reference-generator';

@Injectable()
export class AddPaymentUseCase {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
    @Inject('IPaymentRepository')
    private readonly paymentRepository: IPaymentRepository,
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    private readonly dataSource: DataSource,
  ) { }

  async execute(dto: AddPaymentDto, userId: string): Promise<PaymentResponseDto> {
    const paymentMethod = dto.paymentMethod ?? PaymentMethod.CASH;

    const order = await this.orderRepository.findById(dto.orderId);
    if (!order) {
      throw new NotFoundException('Commande');
    }

    if (order.status === OrderStatus.CANCELLED) {
      throw new InvalidOrderException('Impossible d\'ajouter un paiement à une commande annulée');
    }

    if (order.status === OrderStatus.PAID) {
      throw new InvalidOrderException('La commande est déjà soldée');
    }

    if (dto.amount > order.remainingDebt) {
      throw new InvalidOrderException(
        `Le montant payé (${dto.amount}) ne peut pas être supérieur à la dette restante (${order.remainingDebt})`,
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let paymentReference = dto.reference;
      if (!paymentReference) {
        if (paymentMethod === PaymentMethod.CASH) {
          paymentReference = PaymentReferenceGenerator.generate(paymentMethod);
        } else {
          throw new InvalidOrderException(
            `Une référence est obligatoire pour les paiements ${paymentMethod}`,
          );
        }
      }

      const payment = new Payment(
        dto.orderId,
        dto.amount,
        paymentMethod,
        userId,
        paymentReference,
      );
      const savedPayment = await this.paymentRepository.create(payment);

      order.addPayment(dto.amount);
      await this.orderRepository.update(dto.orderId, {
        amountPaid: order.amountPaid,
        remainingDebt: order.remainingDebt,
        status: order.status,
      });

      await this.customerRepository.updateDebt(order.customerId, order.remainingDebt);

      await queryRunner.commitTransaction();

      return {
        id: savedPayment.id,
        orderId: savedPayment.orderId,
        amount: savedPayment.amount,
        paymentMethod: savedPayment.paymentMethod,
        reference: savedPayment.reference,
        userId: savedPayment.userId,
        createdAt: savedPayment.createdAt,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

}
