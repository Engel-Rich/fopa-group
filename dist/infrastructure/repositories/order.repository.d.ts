import { Repository } from 'typeorm';
import type { IOrderRepository } from 'src/domain/repositories/order.repository.interface';
import { Order, OrderStatus } from 'src/domain/entities/order.entity';
import { OrderEntity } from '../database/entities/order.entity';
export declare class OrderRepository implements IOrderRepository {
    private readonly repository;
    constructor(repository: Repository<OrderEntity>);
    create(order: Order): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    findByOrderNumber(orderNumber: string): Promise<Order | null>;
    findByCustomerId(customerId: string): Promise<Order[]>;
    findAll(): Promise<Order[]>;
    findByStatus(status: OrderStatus): Promise<Order[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Order[]>;
    update(id: string, order: Partial<Order>): Promise<Order>;
    delete(id: string): Promise<void>;
    findUnpaidOrdersByCustomer(customerId: string): Promise<Order[]>;
    findOrdersWithPackagesDebtByCustomer(customerId: string): Promise<Order[]>;
    findPaginated(page: number, limit: number, customerId?: string, status?: OrderStatus): Promise<{
        data: Order[];
        total: number;
        page: number;
        limit: number;
    }>;
    findDailySalesGroupedByDate(page: number, limit: number): Promise<{
        data: Array<{
            date: Date;
            totalSales: number;
            totalOrders: number;
            totalAmountPaid: number;
            totalDebt: number;
        }>;
        total: number;
        page: number;
        limit: number;
    }>;
}
