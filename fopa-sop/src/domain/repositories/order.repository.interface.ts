import { Order, OrderStatus } from '../entities/order.entity';

export interface IOrderRepository {
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
  findPaginated(
    page: number,
    limit: number,
    customerId?: string,
    status?: OrderStatus,
  ): Promise<{ data: Order[]; total: number; page: number; limit: number }>;
  findDailySalesGroupedByDate(
    page: number,
    limit: number,
  ): Promise<{ data: Array<{ date: Date; totalSales: number; totalOrders: number; totalAmountPaid: number; totalDebt: number }>; total: number; page: number; limit: number }>;
}
