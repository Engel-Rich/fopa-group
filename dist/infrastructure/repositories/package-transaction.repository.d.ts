import { Repository } from 'typeorm';
import type { IPackageTransactionRepository } from 'src/domain/repositories/package-transaction.repository.interface';
import { PackageTransaction } from 'src/domain/entities/package-transaction.entity';
import { PackageTransactionEntity } from '../database/entities/package-transaction.entity';
export declare class PackageTransactionRepository implements IPackageTransactionRepository {
    private readonly repository;
    constructor(repository: Repository<PackageTransactionEntity>);
    create(transaction: PackageTransaction): Promise<PackageTransaction>;
    findByCustomerId(customerId: string): Promise<PackageTransaction[]>;
}
