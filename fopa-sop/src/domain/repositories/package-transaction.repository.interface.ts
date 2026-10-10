import { PackageTransaction, PackageTransactionType } from '../entities/package-transaction.entity';

export interface PackageTransactionFilters {
  type?: PackageTransactionType;
  from?: Date;
  to?: Date;
  limit?: number;
  offset?: number;
}

export interface PackageTransactionTotals {
  totalLent: number;
  totalReturned: number;
}

export interface IPackageTransactionRepository {
  create(transaction: PackageTransaction): Promise<PackageTransaction>;
  findByCustomerId(customerId: string): Promise<PackageTransaction[]>;
  findAll(filters?: PackageTransactionFilters): Promise<{ data: PackageTransaction[]; total: number }>;
  getTotals(): Promise<PackageTransactionTotals>;
}
