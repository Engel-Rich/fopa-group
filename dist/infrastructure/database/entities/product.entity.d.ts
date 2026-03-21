import { CategoryEntity } from './category.entity';
import { OrderItemEntity } from './order-item.entity';
import { StockMovementEntity } from './stock-movement.entity';
export declare class ProductEntity {
    id: string;
    name: string;
    categoryId: string;
    category: CategoryEntity;
    quantity: number;
    price: number;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    orderItems: OrderItemEntity[];
    stockMovements: StockMovementEntity[];
}
