import { StockMovementResponseDto } from './stock-movement-response.dto';
export declare class StockMovementListDto {
    movements: StockMovementResponseDto[];
    total: number;
    page: number;
    limit: number;
}
