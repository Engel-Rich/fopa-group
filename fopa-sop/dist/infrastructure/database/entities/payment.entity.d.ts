import { PaymentMethod } from '../../../domain/entities/payment.entity';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';
export declare class PaymentEntity {
    id: string;
    orderId: string;
    order: OrderEntity;
    amount: number;
    paymentMethod: PaymentMethod;
    reference: string;
    userId: string;
    user: UserEntity;
    createdAt: Date;
}
