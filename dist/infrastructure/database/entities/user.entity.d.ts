import { UserRole } from '../../../domain/entities/user.entity';
import { OrderEntity } from './order.entity';
import { StockMovementEntity } from './stock-movement.entity';
import { PaymentEntity } from './payment.entity';
export declare class UserEntity {
    id: string;
    email?: string;
    name: string;
    phone?: string;
    password: string;
    username: string;
    role?: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    orders: OrderEntity[];
    stockMovements: StockMovementEntity[];
    payments: PaymentEntity[];
}
