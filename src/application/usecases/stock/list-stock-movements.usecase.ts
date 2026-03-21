import { Injectable, Inject } from '@nestjs/common';
import type { IStockMovementRepository } from '../../../domain/repositories/stock-movement.repository.interface';
import { StockMovementListDto } from '../../dtos/stock/stock-movement-list.dto';
import { StockMovementResponseDto } from '../../dtos/stock/stock-movement-response.dto';

@Injectable()
export class ListStockMovementsUseCase {
    constructor(
        @Inject('IStockMovementRepository')
        private readonly stockMovementRepository: IStockMovementRepository,
    ) { }

    async execute(
        productId: string,
        page: number = 1,
        limit: number = 50,
    ): Promise<StockMovementListDto> {
        const result = await this.stockMovementRepository.findByProductIdPaginated(
            productId,
            page,
            limit,
        );

        const movements: StockMovementResponseDto[] = result.data.map((movement) => ({
            id: movement.id,
            productId: movement.productId,
            type: movement.type,
            quantity: movement.quantity,
            unitPrice: movement.unitPrice,
            totalAmount: movement.totalAmount,
            reason: movement.reason,
            userId: movement.userId,
            createdAt: movement.createdAt,
        }));

        return {
            movements,
            total: result.total,
            page: result.page,
            limit: result.limit,
        };
    }
}
