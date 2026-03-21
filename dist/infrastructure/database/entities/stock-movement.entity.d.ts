import { StockMovementType } from '../../../domain/entities/stock-movement.entity';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';
export declare class StockMovementEntity {
    id: string;
    productId: string;
    product: ProductEntity;
    type: StockMovementType;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    reason: string;
    userId: string;
    user: UserEntity;
    createdAt: Date;
}
