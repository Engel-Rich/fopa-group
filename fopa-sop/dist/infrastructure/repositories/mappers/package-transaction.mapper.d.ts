import { PackageTransaction } from '../../../domain/entities/package-transaction.entity';
import { PackageTransactionEntity } from '../../database/entities/package-transaction.entity';
export declare class PackageTransactionMapper {
    static toDomain(entity: PackageTransactionEntity): PackageTransaction;
    static toEntity(domain: PackageTransaction): PackageTransactionEntity;
}
