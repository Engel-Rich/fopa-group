import { OrderItem } from '../entities/order-item.entity';

export interface IOrderItemRepository {
  create(item: OrderItem): Promise<OrderItem>;
  createMany(items: OrderItem[]): Promise<OrderItem[]>;
  findById(id: string): Promise<OrderItem | null>;
  findByOrderId(orderId: string): Promise<OrderItem[]>;
  findByProductId(productId: string): Promise<OrderItem[]>;
  findAll(): Promise<OrderItem[]>;
  update(id: string, item: Partial<OrderItem>): Promise<OrderItem>;
  delete(id: string): Promise<void>;
}
