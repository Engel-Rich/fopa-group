"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerMapper = void 0;
const customer_entity_1 = require("../../../domain/entities/customer.entity");
const customer_entity_2 = require("../../database/entities/customer.entity");
const user_mapper_1 = require("./user.mapper");
class CustomerMapper {
    static toDomain(entity) {
        if (!entity.user) {
            throw new Error('User is required for Customer');
        }
        const user = user_mapper_1.UserMapper.toDomain(entity.user);
        const customer = new customer_entity_1.Customer(user.name, user.password, user.username, entity.address, entity.userId, user.email, user.phone);
        customer.id = entity.id;
        customer.currentDebt = parseFloat(entity.currentDebt.toString());
        customer.currentPackagesDebt = parseInt((entity.currentPackagesDebt ?? 0).toString(), 10);
        customer.isActive = user.isActive;
        customer.role = user.role;
        customer.createdAt = entity.createdAt;
        customer.updatedAt = entity.updatedAt;
        return customer;
    }
    static toEntity(domain, userId) {
        const entity = new customer_entity_2.CustomerEntity();
        if (domain.id)
            entity.id = domain.id;
        entity.userId = userId;
        entity.address = domain.address || undefined;
        entity.currentDebt = domain.currentDebt;
        entity.currentPackagesDebt = domain.currentPackagesDebt ?? 0;
        if (domain.createdAt)
            entity.createdAt = domain.createdAt;
        if (domain.updatedAt)
            entity.updatedAt = domain.updatedAt;
        return entity;
    }
}
exports.CustomerMapper = CustomerMapper;
//# sourceMappingURL=customer.mapper.js.map