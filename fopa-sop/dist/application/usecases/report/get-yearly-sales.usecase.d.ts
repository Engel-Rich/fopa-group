import type { IOrderRepository } from '../../../domain/repositories/order.repository.interface';
import { YearlySalesDto } from '../../dtos/report/yearly-sales.dto';
export declare class GetYearlySalesUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(year: number): Promise<YearlySalesDto>;
}
