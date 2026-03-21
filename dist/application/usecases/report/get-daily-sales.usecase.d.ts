import type { IOrderRepository } from '../../../domain/repositories/order.repository.interface';
import { DailySalesListDto } from '../../dtos/report/daily-sales-list.dto';
export declare class GetDailySalesUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(page?: number, limit?: number): Promise<DailySalesListDto>;
}
