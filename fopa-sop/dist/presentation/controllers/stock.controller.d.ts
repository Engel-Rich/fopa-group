import { CreateStockEntryUseCase } from '../../application/usecases/stock/create-stock-entry.usecase';
import { CreateStockExitUseCase } from '../../application/usecases/stock/create-stock-exit.usecase';
import { ListStockMovementsUseCase } from '../../application/usecases/stock/list-stock-movements.usecase';
import { CreateStockEntryDto } from '../../application/dtos/stock/create-stock-entry.dto';
import { CreateStockExitDto } from '../../application/dtos/stock/create-stock-exit.dto';
import { StockMovementResponseDto } from '../../application/dtos/stock/stock-movement-response.dto';
import { StockMovementListDto } from '../../application/dtos/stock/stock-movement-list.dto';
export declare class StockController {
    private readonly createStockEntryUseCase;
    private readonly createStockExitUseCase;
    private readonly listStockMovementsUseCase;
    constructor(createStockEntryUseCase: CreateStockEntryUseCase, createStockExitUseCase: CreateStockExitUseCase, listStockMovementsUseCase: ListStockMovementsUseCase);
    createEntry(dto: CreateStockEntryDto, user: any): Promise<StockMovementResponseDto>;
    createExit(dto: CreateStockExitDto, user: any): Promise<StockMovementResponseDto>;
    getProductMovements(productId: string, page?: string, limit?: string): Promise<StockMovementListDto>;
}
