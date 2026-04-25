import { PackageTransaction } from '../entities/package-transaction.entity';
export interface IPackageTransactionRepository {
    create(transaction: PackageTransaction): Promise<PackageTransaction>;
    findByCustomerId(customerId: string): Promise<PackageTransaction[]>;
}
