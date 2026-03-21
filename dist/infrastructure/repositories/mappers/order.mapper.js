"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMapper = void 0;
const order_entity_1 = require("../../../domain/entities/order.entity");
const order_entity_2 = require("../../database/entities/order.entity");
const customer_mapper_1 = require("./customer.mapper");
const user_mapper_1 = require("./user.mapper");
const order_item_mapper_1 = require("./order-item.mapper");
const payment_mapper_1 = require("./payment.mapper");
class OrderMapper {
    static toDomain(entity) {
        const order = new order_entity_1.Order(entity.orderNumber, entity.customerId, parseFloat(entity.previousDebt.toString()), parseFloat(entity.subtotal.toString()), entity.userId, parseFloat((entity.amountGiven || 0).toString()), parseFloat(entity.amountPaid.toString()));
        order.id = entity.id;
        order.totalAmount = parseFloat(entity.totalAmount.toString());
        order.amountGiven = parseFloat((entity.amountGiven || 0).toString());
        order.amountPaid = parseFloat(entity.amountPaid.toString());
        order.remainingDebt = parseFloat(entity.remainingDebt.toString());
        order.packages = parseInt((entity.packages ?? 0).toString(), 10);
        order.packagesReturned = parseInt((entity.packagesReturned ?? 0).toString(), 10);
        order.remainingPackages = parseInt((entity.remainingPackages ?? 0).toString(), 10);
        order.status = entity.status;
        order.createdAt = entity.createdAt;
        order.updatedAt = entity.updatedAt;
        if (entity.customer) {
            order.customer = customer_mapper_1.CustomerMapper.toDomain(entity.customer);
        }
        if (entity.user) {
            order.user = user_mapper_1.UserMapper.toDomain(entity.user);
        }
        if (entity.createdBy) {
            order.createdBy = entity.createdBy;
        }
        if (entity.createdByUser) {
            order.createdByUser = user_mapper_1.UserMapper.toDomain(entity.createdByUser);
        }
        if (entity.items) {
            order.items = entity.items.map((item) => order_item_mapper_1.OrderItemMapper.toDomain(item));
        }
        if (entity.payments) {
            order.payments = entity.payments.map((payment) => payment_mapper_1.PaymentMapper.toDomain(payment));
        }
        return order;
    }
    static toEntity(domain) {
        const entity = new order_entity_2.OrderEntity();
        if (domain.id)
            entity.id = domain.id;
        entity.orderNumber = domain.orderNumber;
        entity.customerId = domain.customerId;
        entity.previousDebt = domain.previousDebt;
        entity.subtotal = domain.subtotal;
        entity.totalAmount = domain.totalAmount;
        entity.amountGiven = domain.amountGiven;
        entity.amountPaid = domain.amountPaid;
        entity.remainingDebt = domain.remainingDebt;
        entity.packages = domain.packages;
        entity.packagesReturned = domain.packagesReturned;
        entity.remainingPackages = domain.remainingPackages;
        entity.status = domain.status;
        entity.userId = domain.userId;
        if (domain.createdBy)
            entity.createdBy = domain.createdBy;
        if (domain.createdAt)
            entity.createdAt = domain.createdAt;
        if (domain.updatedAt)
            entity.updatedAt = domain.updatedAt;
        return entity;
    }
}
exports.OrderMapper = OrderMapper;
//# sourceMappingURL=order.mapper.js.map