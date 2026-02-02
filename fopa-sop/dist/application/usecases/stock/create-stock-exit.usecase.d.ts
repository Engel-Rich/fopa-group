import type { IStockMovementRepository } from '../../../domain/repositories/stock-movement.repository.interface';
import type { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import { CreateStockExitDto } from '../../dtos/stock/create-stock-exit.dto';
import { StockMovementResponseDto } from '../../dtos/stock/stock-movement-response.dto';
export declare class CreateStockExitUseCase {
    private readonly stockMovementRepository;
    private readonly productRepository;
    constructor(stockMovementRepository: IStockMovementRepository, productRepository: IProductRepository);
    execute(dto: CreateStockExitDto, userId: string): Promise<StockMovementResponseDto>;
}
