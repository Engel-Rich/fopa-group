"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockMovementMapper = void 0;
const stock_movement_entity_1 = require("../../../domain/entities/stock-movement.entity");
const stock_movement_entity_2 = require("../../database/entities/stock-movement.entity");
const product_mapper_1 = require("./product.mapper");
const user_mapper_1 = require("./user.mapper");
class StockMovementMapper {
    static toDomain(entity) {
        const movement = new stock_movement_entity_1.StockMovement(entity.productId, entity.type, entity.quantity, parseFloat(entity.unitPrice.toString()), entity.reason, entity.userId);
        movement.id = entity.id;
        movement.createdAt = entity.createdAt;
        if (entity.product) {
            movement.product = product_mapper_1.ProductMapper.toDomain(entity.product);
        }
        if (entity.user) {
            movement.user = user_mapper_1.UserMapper.toDomain(entity.user);
        }
        return movement;
    }
    static toEntity(domain) {
        const entity = new stock_movement_entity_2.StockMovementEntity();
        if (domain.id)
            entity.id = domain.id;
        entity.productId = domain.productId;
        entity.type = domain.type;
        entity.quantity = domain.quantity;
        entity.unitPrice = domain.unitPrice;
        entity.totalAmount = domain.totalAmount;
        entity.reason = domain.reason || '';
        entity.userId = domain.userId;
        if (domain.createdAt)
            entity.createdAt = domain.createdAt;
        return entity;
    }
}
exports.StockMovementMapper = StockMovementMapper;
//# sourceMappingURL=stock-movement.mapper.js.map