"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
const order_entity_1 = require("../../../domain/entities/order.entity");
const order_item_entity_1 = require("../../../domain/entities/order-item.entity");
const stock_movement_entity_1 = require("../../../domain/entities/stock-movement.entity");
const payment_entity_1 = require("../../../domain/entities/payment.entity");
const order_number_generator_1 = require("../../../shared/utils/order-number-generator");
const payment_reference_generator_1 = require("../../../shared/utils/payment-reference-generator");
let CreateOrderUseCase = class CreateOrderUseCase {
    orderRepository;
    orderItemRepository;
    customerRepository;
    productRepository;
    stockMovementRepository;
    paymentRepository;
    dataSource;
    constructor(orderRepository, orderItemRepository, customerRepository, productRepository, stockMovementRepository, paymentRepository, dataSource) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.stockMovementRepository = stockMovementRepository;
        this.paymentRepository = paymentRepository;
        this.dataSource = dataSource;
    }
    async execute(dto, userId) {
        const customer = await this.customerRepository.findById(dto.customerId);
        if (!customer) {
            throw new business_exception_1.NotFoundException('Client');
        }
        if (!customer.isActive) {
            throw new business_exception_1.InvalidOrderException('Le client est désactivé');
        }
        const previousDebt = customer.currentDebt;
        let subtotal = 0;
        const orderItems = [];
        const stockMovements = [];
        for (const itemDto of dto.items) {
            const product = await this.productRepository.findById(itemDto.productId);
            if (!product) {
                throw new business_exception_1.NotFoundException(`Produit avec l'ID ${itemDto.productId}`);
            }
            if (!product.isActive) {
                throw new business_exception_1.InvalidOrderException(`Le produit ${product.name} est désactivé`);
            }
            if (product.quantity < itemDto.quantity) {
                throw new business_exception_1.InsufficientStockException(product.name, product.quantity, itemDto.quantity);
            }
            const itemSubtotal = product.price * itemDto.quantity;
            subtotal += itemSubtotal;
            const orderItem = new order_item_entity_1.OrderItem('', itemDto.productId, product.name, itemDto.quantity, product.price);
            orderItems.push(orderItem);
            const stockMovement = new stock_movement_entity_1.StockMovement(itemDto.productId, stock_movement_entity_1.StockMovementType.VENTE, itemDto.quantity, product.price, undefined, userId);
            stockMovements.push(stockMovement);
        }
        const totalAmount = subtotal + previousDebt;
        if (subtotal <= 0) {
            throw new business_exception_1.InvalidOrderException('Le montant total doit être supérieur à 0');
        }
        const maxAllowedAmount = totalAmount + previousDebt;
        if (dto.amountPaid > maxAllowedAmount) {
            throw new business_exception_1.InvalidOrderException(`Le montant payé (${dto.amountPaid}) ne peut pas être supérieur à la somme de la dette (${previousDebt}) et du montant total de la commande (${totalAmount}) = ${maxAllowedAmount}`);
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let remainingAmountForNewOrder = dto.amountPaid;
            const unpaidOrders = await this.orderRepository.findUnpaidOrdersByCustomer(dto.customerId);
            unpaidOrders.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
            for (const unpaidOrder of unpaidOrders) {
                if (remainingAmountForNewOrder <= 0) {
                    break;
                }
                const amountNeeded = unpaidOrder.remainingDebt;
                if (amountNeeded > 0) {
                    const amountToPay = Math.min(amountNeeded, remainingAmountForNewOrder);
                    const paymentReference = payment_reference_generator_1.PaymentReferenceGenerator.generate(payment_entity_1.PaymentMethod.CASH);
                    const payment = new payment_entity_1.Payment(unpaidOrder.id, amountToPay, payment_entity_1.PaymentMethod.CASH, userId, paymentReference);
                    await this.paymentRepository.create(payment);
                    unpaidOrder.addPayment(amountToPay);
                    await this.orderRepository.update(unpaidOrder.id, {
                        amountPaid: unpaidOrder.amountPaid,
                        remainingDebt: unpaidOrder.remainingDebt,
                        status: unpaidOrder.status,
                    });
                    remainingAmountForNewOrder -= amountToPay;
                }
            }
            if (remainingAmountForNewOrder > totalAmount) {
                throw new business_exception_1.InvalidOrderException(`Le montant restant après paiement des dettes (${remainingAmountForNewOrder}) ne peut pas être supérieur au montant total de la commande (${totalAmount})`);
            }
            const amountGiven = dto.amountPaid;
            const amountPaidForThisOrder = remainingAmountForNewOrder + previousDebt;
            const orderNumber = order_number_generator_1.OrderNumberGenerator.generate();
            const order = new order_entity_1.Order(orderNumber, dto.customerId, previousDebt, subtotal, userId, amountGiven, amountPaidForThisOrder, userId);
            const savedOrder = await this.orderRepository.create(order);
            const packagesCount = Math.max(0, Math.floor(Number(dto.packages) || 0));
            if (packagesCount > 0) {
                savedOrder.setPackages(packagesCount);
                await this.orderRepository.update(savedOrder.id, {
                    packages: savedOrder.packages,
                    packagesReturned: savedOrder.packagesReturned,
                    remainingPackages: savedOrder.remainingPackages,
                });
                const newPackagesDebt = (customer.currentPackagesDebt ?? 0) + packagesCount;
                await this.customerRepository.updatePackagesDebt(dto.customerId, newPackagesDebt);
            }
            for (const item of orderItems) {
                item.orderId = savedOrder.id;
            }
            await this.orderItemRepository.createMany(orderItems);
            for (const movement of stockMovements) {
                await this.stockMovementRepository.create(movement);
                await this.productRepository.updateStock(movement.productId, -movement.quantity);
            }
            if (remainingAmountForNewOrder > 0) {
                const paymentReference = payment_reference_generator_1.PaymentReferenceGenerator.generate(payment_entity_1.PaymentMethod.CASH);
                const payment = new payment_entity_1.Payment(savedOrder.id, remainingAmountForNewOrder, payment_entity_1.PaymentMethod.CASH, userId, paymentReference);
                await this.paymentRepository.create(payment);
                const orderToUpdate = await this.orderRepository.findById(savedOrder.id);
                if (!orderToUpdate) {
                    throw new business_exception_1.NotFoundException('Commande');
                }
                let newStatus;
                if (orderToUpdate.remainingDebt <= 0) {
                    newStatus = order_entity_1.OrderStatus.PAID;
                }
                else if (amountPaidForThisOrder > 0 && amountPaidForThisOrder < orderToUpdate.totalAmount) {
                    newStatus = order_entity_1.OrderStatus.PARTIALLY_PAID;
                }
                else {
                    newStatus = order_entity_1.OrderStatus.PENDING;
                }
                await this.orderRepository.update(savedOrder.id, {
                    status: newStatus,
                    amountPaid: amountPaidForThisOrder,
                });
            }
            const finalOrder = await this.orderRepository.findById(savedOrder.id);
            if (!finalOrder) {
                throw new business_exception_1.NotFoundException('Commande');
            }
            await this.customerRepository.updateDebt(dto.customerId, finalOrder.remainingDebt);
            await queryRunner.commitTransaction();
            const completeOrder = await this.orderRepository.findById(savedOrder.id);
            if (!completeOrder) {
                throw new business_exception_1.NotFoundException('Commande');
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
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.CreateOrderUseCase = CreateOrderUseCase;
exports.CreateOrderUseCase = CreateOrderUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IOrderRepository')),
    __param(1, (0, common_1.Inject)('IOrderItemRepository')),
    __param(2, (0, common_1.Inject)('ICustomerRepository')),
    __param(3, (0, common_1.Inject)('IProductRepository')),
    __param(4, (0, common_1.Inject)('IStockMovementRepository')),
    __param(5, (0, common_1.Inject)('IPaymentRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, typeorm_1.DataSource])
], CreateOrderUseCase);
//# sourceMappingURL=create-order.usecase.js.map