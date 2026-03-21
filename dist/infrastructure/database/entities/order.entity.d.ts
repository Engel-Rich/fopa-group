import { OrderStatus } from '../../../domain/entities/order.entity';
import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';
import { OrderItemEntity } from './order-item.entity';
import { PaymentEntity } from './payment.entity';
export declare class OrderEntity {
    id: string;
    orderNumber: string;
    customerId: string;
    customer: CustomerEntity;
    previousDebt: number;
    subtotal: number;
    totalAmount: number;
    amountGiven: number;
    amountPaid: number;
    remainingDebt: number;
    packages: number;
    packagesReturned: number;
    remainingPackages: number;
    status: OrderStatus;
    userId: string;
    user: UserEntity;
    createdBy: string;
    createdByUser: UserEntity;
    createdAt: Date;
    updatedAt: Date;
    items: OrderItemEntity[];
    payments: PaymentEntity[];
}
