import type { IOrderRepository } from '../../../domain/repositories/order.repository.interface';
import { MonthlySalesDto } from '../../dtos/report/monthly-sales.dto';
export declare class GetMonthlySalesUseCase {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    execute(month: number, year: number): Promise<MonthlySalesDto>;
}
