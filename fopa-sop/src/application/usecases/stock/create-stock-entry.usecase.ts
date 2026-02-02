import { Injectable, Inject } from '@nestjs/common';
import type { IStockMovementRepository } from '../../../domain/repositories/stock-movement.repository.interface';
import type { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import { NotFoundException } from '../../../shared/exceptions/business.exception';
import { CreateStockEntryDto } from '../../dtos/stock/create-stock-entry.dto';
import { StockMovementResponseDto } from '../../dtos/stock/stock-movement-response.dto';
import { StockMovement, StockMovementType } from '../../../domain/entities/stock-movement.entity';

@Injectable()
export class CreateStockEntryUseCase {
  constructor(
    @Inject('IStockMovementRepository')
    private readonly stockMovementRepository: IStockMovementRepository,
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(dto: CreateStockEntryDto, userId: string): Promise<StockMovementResponseDto> {
    const product = await this.productRepository.findById(dto.productId);
    if (!product) {
      throw new NotFoundException('Produit');
    }

    const movement = new StockMovement(
      dto.productId,
      StockMovementType.ENTREE,
      dto.quantity,
      dto.unitPrice,
      undefined,
      userId,
    );

    const savedMovement = await this.stockMovementRepository.create(movement);

    // Mettre à jour le stock du produit
    await this.productRepository.updateStock(dto.productId, dto.quantity);

    return {
      id: savedMovement.id,
      productId: savedMovement.productId,
      type: savedMovement.type,
      quantity: savedMovement.quantity,
      unitPrice: savedMovement.unitPrice,
      totalAmount: savedMovement.totalAmount,
      reason: savedMovement.reason,
      userId: savedMovement.userId,
      createdAt: savedMovement.createdAt,
    };
  }
}
