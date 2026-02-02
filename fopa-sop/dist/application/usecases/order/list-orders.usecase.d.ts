import type { IOrderRepository } from '../../../domain/repositories/order.repository.interface';
import { OrderListDto } from '../../dtos/order/order-list.dto';
import { OrderStatus } from '../../../domain/entities/order.entity';
export declare class ListOrdersUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(page?: number, limit?: number, customerId?: string, status?: OrderStatus): Promise<OrderListDto>;
}
