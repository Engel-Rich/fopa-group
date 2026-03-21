import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import type { IOrderRepository } from 'src/domain/repositories/order.repository.interface';
import { Order, OrderStatus } from 'src/domain/entities/order.entity';
import { OrderEntity } from '../database/entities/order.entity';
import { OrderMapper } from './mappers/order.mapper';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repository: Repository<OrderEntity>,
  ) { }

  async create(order: Order): Promise<Order> {
    const entity = OrderMapper.toEntity(order);
    const saved = await this.repository.save(entity);
    return OrderMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Order | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['customer', 'customer.user', 'user', 'createdByUser', 'items', 'items.product', 'payments', 'payments.user'],
    });
    return entity ? OrderMapper.toDomain(entity) : null;
  }

  async findByOrderNumber(orderNumber: string): Promise<Order | null> {
    const entity = await this.repository.findOne({
      where: { orderNumber },
      relations: ['customer', 'customer.user', 'user', 'createdByUser', 'items', 'items.product', 'payments', 'payments.user'],
    });
    return entity ? OrderMapper.toDomain(entity) : null;
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    const entities = await this.repository.find({
      where: { customerId },
      relations: ['customer', 'customer.user', 'user', 'createdByUser', 'items', 'items.product', 'payments', 'payments.user'],
      order: { createdAt: 'DESC' },
    });
    return entities.map((entity) => OrderMapper.toDomain(entity));
  }

  async findAll(): Promise<Order[]> {
    const entities = await this.repository.find({
      relations: ['customer', 'user', 'createdByUser', 'items', 'items.product', 'payments', 'payments.user'],
      order: { createdAt: 'DESC' },
    });
    return entities.map((entity) => OrderMapper.toDomain(entity));
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    const entities = await this.repository.find({
      where: { status },
      relations: ['customer', 'customer.user', 'user', 'createdByUser', 'items', 'items.product', 'payments', 'payments.user'],
      order: { createdAt: 'DESC' },
    });
    return entities.map((entity) => OrderMapper.toDomain(entity));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Order[]> {
    const entities = await this.repository.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
      relations: ['customer', 'user', 'createdByUser', 'items', 'items.product', 'payments', 'payments.user'],
      order: { createdAt: 'DESC' },
    });
    return entities.map((entity) => OrderMapper.toDomain(entity));
  }

  async update(id: string, order: Partial<Order>): Promise<Order> {
    await this.repository.update(id, order);
    const updated = await this.repository.findOne({
      where: { id },
      relations: ['customer', 'customer.user', 'user', 'createdByUser', 'items', 'items.product', 'payments', 'payments.user'],
    });
    if (!updated) {
      throw new Error('Order not found');
    }
    return OrderMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findUnpaidOrdersByCustomer(customerId: string): Promise<Order[]> {
    const entities = await this.repository
      .createQueryBuilder('order')
      .where('order.customerId = :customerId', { customerId })
      .andWhere('order.status IN (:...statuses)', {
        statuses: [OrderStatus.PENDING, OrderStatus.PARTIALLY_PAID],
      })
      .leftJoinAndSelect('order.customer', 'customer')
      .leftJoinAndSelect('customer.user', 'customerUser')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.createdByUser', 'createdByUser')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .leftJoinAndSelect('order.payments', 'payments')
      .leftJoinAndSelect('payments.user', 'paymentUser')
      .orderBy('order.createdAt', 'DESC')
      .getMany();

    return entities.map((entity) => OrderMapper.toDomain(entity));
  }

  async findOrdersWithPackagesDebtByCustomer(customerId: string): Promise<Order[]> {
    const entities = await this.repository
      .createQueryBuilder('order')
      .where('order.customerId = :customerId', { customerId })
      .andWhere('order.remainingPackages > 0')
      .leftJoinAndSelect('order.customer', 'customer')
      .leftJoinAndSelect('customer.user', 'customerUser')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.createdByUser', 'createdByUser')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .leftJoinAndSelect('order.payments', 'payments')
      .leftJoinAndSelect('payments.user', 'paymentUser')
      .orderBy('order.createdAt', 'ASC')
      .getMany();

    return entities.map((entity) => OrderMapper.toDomain(entity));
  }

  async findPaginated(
    page: number,
    limit: number,
    customerId?: string,
    status?: OrderStatus,
  ): Promise<{ data: Order[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;
    const queryBuilder = this.repository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.customer', 'customer')
      .leftJoinAndSelect('customer.user', 'customerUser')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.createdByUser', 'createdByUser')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .leftJoinAndSelect('order.payments', 'payments')
      .leftJoinAndSelect('payments.user', 'paymentUser')
      .orderBy('order.createdAt', 'DESC');

    if (customerId) {
      queryBuilder.andWhere('order.customerId = :customerId', { customerId });
    }

    if (status) {
      queryBuilder.andWhere('order.status = :status', { status });
    }

    const [entities, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: entities.map((entity) => OrderMapper.toDomain(entity)),
      total,
      page,
      limit,
    };
  }

  async findDailySalesGroupedByDate(
    page: number,
    limit: number,
  ): Promise<{ data: Array<{ date: Date; totalSales: number; totalOrders: number; totalAmountPaid: number; totalDebt: number }>; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;

    // Requête pour obtenir les ventes groupées par jour (PostgreSQL)
    const queryBuilder = this.repository
      .createQueryBuilder('order')
      .select("DATE_TRUNC('day', order.createdAt)", 'date')
      .addSelect('SUM(order.subtotal)', 'totalSales')
      .addSelect('COUNT(order.id)', 'totalOrders')
      .addSelect('SUM(order.amountPaid)', 'totalAmountPaid')
      .addSelect('SUM(order.remainingDebt)', 'totalDebt')
      .groupBy("DATE_TRUNC('day', order.createdAt)")
      .orderBy("DATE_TRUNC('day', order.createdAt)", 'DESC');

    // Compter le total de jours distincts
    const totalQuery = this.repository
      .createQueryBuilder('order')
      .select("COUNT(DISTINCT DATE_TRUNC('day', order.createdAt))", 'count')
      .getRawOne();

    const [results, totalResult] = await Promise.all([
      queryBuilder
        .offset(skip)
        .limit(limit)
        .getRawMany(),
      totalQuery,
    ]);

    const total = parseInt(totalResult?.count || '0', 10);

    const data = results.map((row) => ({
      date: new Date(row.date),
      totalSales: parseFloat(row.totalSales || '0'),
      totalOrders: parseInt(row.totalOrders || '0', 10),
      totalAmountPaid: parseFloat(row.totalAmountPaid || '0'),
      totalDebt: parseFloat(row.totalDebt || '0'),
    }));

    return {
      data,
      total,
      page,
      limit,
    };
  }
}
