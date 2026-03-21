import { Product } from './product.entity';
import { Order } from './order.entity';
export declare class OrderItem {
    id: string;
    orderId: string;
    order?: Order;
    productId: string;
    product?: Product;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    createdAt: Date;
    constructor(orderId: string, productId: string, productName: string, quantity: number, unitPrice: number);
}
