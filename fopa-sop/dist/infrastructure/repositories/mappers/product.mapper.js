"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMapper = void 0;
const product_entity_1 = require("../../../domain/entities/product.entity");
const product_entity_2 = require("../../database/entities/product.entity");
const category_mapper_1 = require("./category.mapper");
class ProductMapper {
    static toDomain(entity) {
        const product = new product_entity_1.Product(entity.name, entity.categoryId, entity.quantity, parseFloat(entity.price.toString()), entity.description);
        product.id = entity.id;
        product.isActive = entity.isActive;
        product.createdAt = entity.createdAt;
        product.updatedAt = entity.updatedAt;
        if (entity.category) {
            product.category = category_mapper_1.CategoryMapper.toDomain(entity.category);
        }
        return product;
    }
    static toEntity(domain) {
        const entity = new product_entity_2.ProductEntity();
        if (domain.id)
            entity.id = domain.id;
        entity.name = domain.name;
        entity.categoryId = domain.categoryId;
        entity.quantity = domain.quantity;
        entity.price = domain.price;
        entity.description = domain.description || '';
        entity.isActive = domain.isActive;
        if (domain.createdAt)
            entity.createdAt = domain.createdAt;
        if (domain.updatedAt)
            entity.updatedAt = domain.updatedAt;
        return entity;
    }
}
exports.ProductMapper = ProductMapper;
//# sourceMappingURL=product.mapper.js.map