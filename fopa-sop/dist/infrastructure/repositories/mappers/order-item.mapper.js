"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemMapper = void 0;
const order_item_entity_1 = require("../../../domain/entities/order-item.entity");
const order_item_entity_2 = require("../../database/entities/order-item.entity");
const product_mapper_1 = require("./product.mapper");
class OrderItemMapper {
    static toDomain(entity) {
        const item = new order_item_entity_1.OrderItem(entity.orderId, entity.productId, entity.name, entity.quantity, parseFloat(entity.unitPrice.toString()));
        item.id = entity.id;
        item.createdAt = entity.createdAt;
        if (entity.product) {
            item.product = product_mapper_1.ProductMapper.toDomain(entity.product);
        }
        return item;
    }
    static toEntity(domain) {
        const entity = new order_item_entity_2.OrderItemEntity();
        if (domain.id)
            entity.id = domain.id;
        entity.orderId = domain.orderId;
        entity.productId = domain.productId;
        entity.name = domain.name;
        entity.quantity = domain.quantity;
        entity.unitPrice = domain.unitPrice;
        entity.subtotal = domain.subtotal;
        if (domain.createdAt)
            entity.createdAt = domain.createdAt;
        return entity;
    }
}
exports.OrderItemMapper = OrderItemMapper;
//# sourceMappingURL=order-item.mapper.js.map