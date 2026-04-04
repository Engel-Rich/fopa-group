import type { IOrderRepository } from '../../../domain/repositories/order.repository.interface';
import { OrderResponseDto } from '../../dtos/order/order-response.dto';
export declare class GetOrderDetailsUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(orderId: string): Promise<OrderResponseDto>;
}
