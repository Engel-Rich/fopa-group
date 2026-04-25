import { PackageTransactionType } from '../../../domain/entities/package-transaction.entity';
export declare class PackageTransactionResponseDto {
    id: string;
    customerId: string;
    type: PackageTransactionType;
    quantity: number;
    userId: string;
    notes?: string;
    createdAt: Date;
}
export declare class PackagesDebtResponseDto {
    customerId: string;
    currentPackagesDebt: number;
}
