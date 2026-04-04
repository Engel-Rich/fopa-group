import type { IStockMovementRepository } from '../../../domain/repositories/stock-movement.repository.interface';
import type { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import { CreateStockEntryDto } from '../../dtos/stock/create-stock-entry.dto';
import { StockMovementResponseDto } from '../../dtos/stock/stock-movement-response.dto';
export declare class CreateStockEntryUseCase {
    private readonly stockMovementRepository;
    private readonly productRepository;
    constructor(stockMovementRepository: IStockMovementRepository, productRepository: IProductRepository);
    execute(dto: CreateStockEntryDto, userId: string): Promise<StockMovementResponseDto>;
}
