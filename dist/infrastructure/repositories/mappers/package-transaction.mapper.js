"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageTransactionMapper = void 0;
const package_transaction_entity_1 = require("../../../domain/entities/package-transaction.entity");
const package_transaction_entity_2 = require("../../database/entities/package-transaction.entity");
class PackageTransactionMapper {
    static toDomain(entity) {
        const transaction = new package_transaction_entity_1.PackageTransaction(entity.customerId, entity.type, entity.quantity, entity.userId, entity.notes);
        transaction.id = entity.id;
        transaction.createdAt = entity.createdAt;
        return transaction;
    }
    static toEntity(domain) {
        const entity = new package_transaction_entity_2.PackageTransactionEntity();
        if (domain.id)
            entity.id = domain.id;
        entity.customerId = domain.customerId;
        entity.type = domain.type;
        entity.quantity = domain.quantity;
        entity.userId = domain.userId;
        entity.notes = domain.notes;
        return entity;
    }
}
exports.PackageTransactionMapper = PackageTransactionMapper;
//# sourceMappingURL=package-transaction.mapper.js.map