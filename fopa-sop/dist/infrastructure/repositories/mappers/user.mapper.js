"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const user_entity_1 = require("../../../domain/entities/user.entity");
const user_entity_2 = require("../../database/entities/user.entity");
class UserMapper {
    static toDomain(entity) {
        const user = new user_entity_1.User(entity.name, entity.password, entity.username, entity.phone, entity.role, entity.email);
        user.id = entity.id;
        user.isActive = entity.isActive;
        user.createdAt = entity.createdAt;
        user.updatedAt = entity.updatedAt;
        return user;
    }
    static toEntity(domain) {
        const entity = new user_entity_2.UserEntity();
        if (domain.id)
            entity.id = domain.id;
        entity.email = domain.email;
        entity.name = domain.name;
        entity.phone = domain.phone;
        entity.password = domain.password;
        entity.username = domain.username;
        entity.role = domain.role;
        entity.isActive = domain.isActive;
        if (domain.createdAt)
            entity.createdAt = domain.createdAt;
        if (domain.updatedAt)
            entity.updatedAt = domain.updatedAt;
        return entity;
    }
    static toModelFromDto(dto) {
        return new user_entity_1.User(dto.name, dto.password, dto.username, dto.phone, dto.role, dto.email);
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map