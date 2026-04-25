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
exports.AddPaymentUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
const payment_entity_1 = require("../../../domain/entities/payment.entity");
const order_entity_1 = require("../../../domain/entities/order.entity");
const payment_reference_generator_1 = require("../../../shared/utils/payment-reference-generator");
let AddPaymentUseCase = class AddPaymentUseCase {
    orderRepository;
    paymentRepository;
    customerRepository;
    dataSource;
    constructor(orderRepository, paymentRepository, customerRepository, dataSource) {
        this.orderRepository = orderRepository;
        this.paymentRepository = paymentRepository;
        this.customerRepository = customerRepository;
        this.dataSource = dataSource;
    }
    async execute(dto, userId) {
        const paymentMethod = dto.paymentMethod ?? payment_entity_1.PaymentMethod.CASH;
        const order = await this.orderRepository.findById(dto.orderId);
        if (!order) {
            throw new business_exception_1.NotFoundException('Commande');
        }
        if (order.status === order_entity_1.OrderStatus.CANCELLED) {
            throw new business_exception_1.InvalidOrderException('Impossible d\'ajouter un paiement à une commande annulée');
        }
        if (order.status === order_entity_1.OrderStatus.PAID) {
            throw new business_exception_1.InvalidOrderException('La commande est déjà soldée');
        }
        if (dto.amount > order.remainingDebt) {
            throw new business_exception_1.InvalidOrderException(`Le montant payé (${dto.amount}) ne peut pas être supérieur à la dette restante (${order.remainingDebt})`);
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let paymentReference = dto.reference;
            if (!paymentReference) {
                if (paymentMethod === payment_entity_1.PaymentMethod.CASH) {
                    paymentReference = payment_reference_generator_1.PaymentReferenceGenerator.generate(paymentMethod);
                }
                else {
                    throw new business_exception_1.InvalidOrderException(`Une référence est obligatoire pour les paiements ${paymentMethod}`);
                }
            }
            const payment = new payment_entity_1.Payment(dto.orderId, dto.amount, paymentMethod, userId, paymentReference);
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
exports.AddPaymentUseCase = AddPaymentUseCase;
exports.AddPaymentUseCase = AddPaymentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IOrderRepository')),
    __param(1, (0, common_1.Inject)('IPaymentRepository')),
    __param(2, (0, common_1.Inject)('ICustomerRepository')),
    __metadata("design:paramtypes", [Object, Object, Object, typeorm_1.DataSource])
], AddPaymentUseCase);
//# sourceMappingURL=add-payment.usecase.js.map