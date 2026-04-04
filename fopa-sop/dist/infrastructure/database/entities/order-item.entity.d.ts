import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';
export declare class OrderItemEntity {
    id: string;
    orderId: string;
    order: OrderEntity;
    productId: string;
    product: ProductEntity;
    name: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    createdAt: Date;
}
