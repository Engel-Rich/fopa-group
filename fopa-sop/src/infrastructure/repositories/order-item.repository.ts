import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IOrderItemRepository } from 'src/domain/repositories/order-item.repository.interface';
import { OrderItem } from 'src/domain/entities/order-item.entity';
import { OrderItemEntity } from '../database/entities/order-item.entity';
import { OrderItemMapper } from './mappers/order-item.mapper';

@Injectable()
export class OrderItemRepository implements IOrderItemRepository {
  constructor(
    @InjectRepository(OrderItemEntity)
    private readonly repository: Repository<OrderItemEntity>,
  ) { }

  async create(item: OrderItem): Promise<OrderItem> {
    const entity = OrderItemMapper.toEntity(item);
    const saved = await this.repository.save(entity);
    return OrderItemMapper.toDomain(saved);
  }

  async createMany(items: OrderItem[]): Promise<OrderItem[]> {
    const entities = items.map((item) => OrderItemMapper.toEntity(item));
    const saved = await this.repository.save(entities);
    return saved.map((entity) => OrderItemMapper.toDomain(entity));
  }

  async findById(id: string): Promise<OrderItem | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['product', 'order'],
    });
    return entity ? OrderItemMapper.toDomain(entity) : null;
  }

  async findByOrderId(orderId: string): Promise<OrderItem[]> {
    const entities = await this.repository.find({
      where: { orderId },
      relations: ['product', 'order'],
    });
    return entities.map((entity) => OrderItemMapper.toDomain(entity));
  }

  async findByProductId(productId: string): Promise<OrderItem[]> {
    const entities = await this.repository.find({
      where: { productId },
      relations: ['product', 'order'],
    });
    return entities.map((entity) => OrderItemMapper.toDomain(entity));
  }

  async findAll(): Promise<OrderItem[]> {
    const entities = await this.repository.find({
      relations: ['product', 'order'],
    });
    return entities.map((entity) => OrderItemMapper.toDomain(entity));
  }

  async update(id: string, item: Partial<OrderItem>): Promise<OrderItem> {
    await this.repository.update(id, item);
    const updated = await this.repository.findOne({
      where: { id },
      relations: ['product', 'order'],
    });
    if (!updated) {
      throw new Error('OrderItem not found');
    }
    return OrderItemMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
