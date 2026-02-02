import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';
export declare class CustomerEntity {
    id: string;
    userId: string;
    user: UserEntity;
    address?: string;
    currentDebt: number;
    currentPackagesDebt: number;
    createdAt: Date;
    updatedAt: Date;
    orders: OrderEntity[];
}
