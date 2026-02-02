"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMapper = void 0;
const payment_entity_1 = require("../../../domain/entities/payment.entity");
const payment_entity_2 = require("../../database/entities/payment.entity");
const user_mapper_1 = require("./user.mapper");
class PaymentMapper {
    static toDomain(entity) {
        const payment = new payment_entity_1.Payment(entity.orderId, parseFloat(entity.amount.toString()), entity.paymentMethod, entity.userId, entity.reference);
        payment.id = entity.id;
        payment.createdAt = entity.createdAt;
        if (entity.user) {
            payment.user = user_mapper_1.UserMapper.toDomain(entity.user);
        }
        return payment;
    }
    static toEntity(domain) {
        const entity = new payment_entity_2.PaymentEntity();
        if (domain.id)
            entity.id = domain.id;
        entity.orderId = domain.orderId;
        entity.amount = domain.amount;
        entity.paymentMethod = domain.paymentMethod;
        entity.userId = domain.userId;
        entity.reference = domain.reference || '';
        if (domain.createdAt)
            entity.createdAt = domain.createdAt;
        return entity;
    }
}
exports.PaymentMapper = PaymentMapper;
//# sourceMappingURL=payment.mapper.js.map