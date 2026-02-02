import { StockMovement, StockMovementType } from '../entities/stock-movement.entity';
export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}
export interface IStockMovementRepository {
    create(movement: StockMovement): Promise<StockMovement>;
    findById(id: string): Promise<StockMovement | null>;
    findByProductId(productId: string): Promise<StockMovement[]>;
    findByProductIdPaginated(productId: string, page: number, limit: number): Promise<PaginatedResult<StockMovement>>;
    findByType(type: StockMovementType): Promise<StockMovement[]>;
    findAll(): Promise<StockMovement[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<StockMovement[]>;
    findByProductAndDateRange(productId: string, startDate: Date, endDate: Date): Promise<StockMovement[]>;
}
