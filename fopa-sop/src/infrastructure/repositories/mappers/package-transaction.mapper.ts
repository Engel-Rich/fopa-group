import { PackageTransaction } from '../../../domain/entities/package-transaction.entity';
import { PackageTransactionEntity } from '../../database/entities/package-transaction.entity';

export class PackageTransactionMapper {
  static toDomain(entity: PackageTransactionEntity): PackageTransaction {
    const transaction = new PackageTransaction(
      entity.customerId,
      entity.type,
      entity.quantity,
      entity.userId,
      entity.notes,
    );
    transaction.id = entity.id;
    transaction.createdAt = entity.createdAt;
    return transaction;
  }

  static toEntity(domain: PackageTransaction): PackageTransactionEntity {
    const entity = new PackageTransactionEntity();
    if (domain.id) entity.id = domain.id;
    entity.customerId = domain.customerId;
    entity.type = domain.type;
    entity.quantity = domain.quantity;
    entity.userId = domain.userId;
    entity.notes = domain.notes;
    return entity;
  }
}
