import { StockMovementType } from '../../../domain/entities/stock-movement.entity';
export declare class StockMovementResponseDto {
    id: string;
    productId: string;
    type: StockMovementType;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    reason?: string;
    userId: string;
    createdAt: Date;
}
