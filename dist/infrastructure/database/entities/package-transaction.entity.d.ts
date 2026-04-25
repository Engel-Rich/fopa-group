import { PackageTransactionType } from '../../../domain/entities/package-transaction.entity';
import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';
export declare class PackageTransactionEntity {
    id: string;
    customerId: string;
    customer: CustomerEntity;
    type: PackageTransactionType;
    quantity: number;
    userId: string;
    user: UserEntity;
    notes?: string;
    createdAt: Date;
}
