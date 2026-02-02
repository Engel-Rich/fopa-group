import { Repository } from 'typeorm';
import type { IOrderItemRepository } from 'src/domain/repositories/order-item.repository.interface';
import { OrderItem } from 'src/domain/entities/order-item.entity';
import { OrderItemEntity } from '../database/entities/order-item.entity';
export declare class OrderItemRepository implements IOrderItemRepository {
    private readonly repository;
    constructor(repository: Repository<OrderItemEntity>);
    create(item: OrderItem): Promise<OrderItem>;
    createMany(items: OrderItem[]): Promise<OrderItem[]>;
    findById(id: string): Promise<OrderItem | null>;
    findByOrderId(orderId: string): Promise<OrderItem[]>;
    findByProductId(productId: string): Promise<OrderItem[]>;
    findAll(): Promise<OrderItem[]>;
    update(id: string, item: Partial<OrderItem>): Promise<OrderItem>;
    delete(id: string): Promise<void>;
}
