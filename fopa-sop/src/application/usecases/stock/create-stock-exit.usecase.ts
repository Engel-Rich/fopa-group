import { Injectable, Inject } from '@nestjs/common';
import type { IStockMovementRepository } from '../../../domain/repositories/stock-movement.repository.interface';
import type { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import { NotFoundException, InsufficientStockException } from '../../../shared/exceptions/business.exception';
import { CreateStockExitDto } from '../../dtos/stock/create-stock-exit.dto';
import { StockMovementResponseDto } from '../../dtos/stock/stock-movement-response.dto';
import { StockMovement, StockMovementType } from '../../../domain/entities/stock-movement.entity';

@Injectable()
export class CreateStockExitUseCase {
  constructor(
    @Inject('IStockMovementRepository')
    private readonly stockMovementRepository: IStockMovementRepository,
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(dto: CreateStockExitDto, userId: string): Promise<StockMovementResponseDto> {
    const product = await this.productRepository.findById(dto.productId);
    if (!product) {
      throw new NotFoundException('Produit');
    }

    if (product.quantity < dto.quantity) {
      throw new InsufficientStockException(product.name, product.quantity, dto.quantity);
    }

    // Utiliser le prix actuel du produit pour le mouvement
    const movement = new StockMovement(
      dto.productId,
      StockMovementType.SORTIE,
      dto.quantity,
      product.price,
      dto.reason,
      userId,
    );

    const savedMovement = await this.stockMovementRepository.create(movement);

    // Mettre à jour le stock du produit (quantité négative)
    await this.productRepository.updateStock(dto.productId, -dto.quantity);

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
