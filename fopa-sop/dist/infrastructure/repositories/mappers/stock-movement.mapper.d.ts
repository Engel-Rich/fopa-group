import { StockMovement } from '../../../domain/entities/stock-movement.entity';
import { StockMovementEntity } from '../../database/entities/stock-movement.entity';
export declare class StockMovementMapper {
    static toDomain(entity: StockMovementEntity): StockMovement;
    static toEntity(domain: StockMovement): StockMovementEntity;
}
