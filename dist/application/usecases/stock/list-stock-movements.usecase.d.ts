import type { IStockMovementRepository } from '../../../domain/repositories/stock-movement.repository.interface';
import { StockMovementListDto } from '../../dtos/stock/stock-movement-list.dto';
export declare class ListStockMovementsUseCase {
    private readonly stockMovementRepository;
    constructor(stockMovementRepository: IStockMovementRepository);
    execute(productId: string, page?: number, limit?: number): Promise<StockMovementListDto>;
}
