import { Repository } from 'typeorm';
import type { IStockMovementRepository } from 'src/domain/repositories/stock-movement.repository.interface';
import { StockMovement, StockMovementType } from 'src/domain/entities/stock-movement.entity';
import { StockMovementEntity } from '../database/entities/stock-movement.entity';
export declare class StockMovementRepository implements IStockMovementRepository {
    private readonly repository;
    constructor(repository: Repository<StockMovementEntity>);
    create(movement: StockMovement): Promise<StockMovement>;
    findById(id: string): Promise<StockMovement | null>;
    findByProductId(productId: string): Promise<StockMovement[]>;
    findByProductIdPaginated(productId: string, page: number, limit: number): Promise<{
        data: StockMovement[];
        total: number;
        page: number;
        limit: number;
    }>;
    findByType(type: StockMovementType): Promise<StockMovement[]>;
    findAll(): Promise<StockMovement[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<StockMovement[]>;
    findByProductAndDateRange(productId: string, startDate: Date, endDate: Date): Promise<StockMovement[]>;
}
