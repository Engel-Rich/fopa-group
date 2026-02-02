"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMapper = void 0;
const category_entity_1 = require("../../../domain/entities/category.entity");
const category_entity_2 = require("../../database/entities/category.entity");
class CategoryMapper {
    static toDomain(entity) {
        const category = new category_entity_1.Category(entity.name, entity.description);
        category.id = entity.id;
        category.createdAt = entity.createdAt;
        category.updatedAt = entity.updatedAt;
        return category;
    }
    static toEntity(domain) {
        const entity = new category_entity_2.CategoryEntity();
        if (domain.id)
            entity.id = domain.id;
        entity.name = domain.name;
        entity.description = domain.description || '';
        if (domain.createdAt)
            entity.createdAt = domain.createdAt;
        if (domain.updatedAt)
            entity.updatedAt = domain.updatedAt;
        return entity;
    }
}
exports.CategoryMapper = CategoryMapper;
//# sourceMappingURL=category.mapper.js.map