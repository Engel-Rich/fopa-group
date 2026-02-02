import { Injectable, Inject } from '@nestjs/common';
import type { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import type { ICategoryRepository } from '../../../domain/repositories/category.repository.interface';
import { NotFoundException } from '../../../shared/exceptions/business.exception';
import { CreateProductDto } from '../../dtos/product/create-product.dto';
import { ProductResponseDto } from '../../dtos/product/product-response.dto';
import { Product } from '../../../domain/entities/product.entity';
import { CreateStockEntryUseCase } from '../stock/create-stock-entry.usecase';
import { CreateStockEntryDto } from '../../dtos/stock/create-stock-entry.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    private readonly createStockEntryUseCase: CreateStockEntryUseCase,
  ) { }

  async execute(dto: CreateProductDto, userId: string): Promise<ProductResponseDto> {
    const category = await this.categoryRepository.findById(dto.categoryId);
    if (!category) {
      throw new NotFoundException('Catégorie');
    }

    // Créer le produit avec quantity: 0 initialement
    // La quantité sera ajoutée via le mouvement d'entrée si nécessaire
    const product = new Product(
      dto.name,
      dto.categoryId,
      0,
      dto.price,
      dto.description,
    );

    const savedProduct = await this.productRepository.create(product);

    // Si la quantité est supérieure à zéro, créer un mouvement d'entrée
    if (dto.quantity > 0) {
      const stockEntryDto: CreateStockEntryDto = {
        productId: savedProduct.id,
        quantity: dto.quantity,
        unitPrice: dto.price,
      };
      await this.createStockEntryUseCase.execute(stockEntryDto, userId);
      
      // Récupérer le produit mis à jour après le mouvement d'entrée
      const updatedProduct = await this.productRepository.findById(savedProduct.id);
      if (updatedProduct) {
        return {
          id: updatedProduct.id,
          name: updatedProduct.name,
          categoryId: updatedProduct.categoryId,
          quantity: updatedProduct.quantity,
          price: updatedProduct.price,
          description: updatedProduct.description,
          isActive: updatedProduct.isActive,
          createdAt: updatedProduct.createdAt,
          updatedAt: updatedProduct.updatedAt,
          category: updatedProduct.category ? {
            id: updatedProduct.category.id,
            name: updatedProduct.category.name,
            description: updatedProduct.category.description,
            createdAt: updatedProduct.category.createdAt,
            updatedAt: updatedProduct.category.updatedAt,
          } : undefined,
        };
      }
    }

    return {
      id: savedProduct.id,
      name: savedProduct.name,
      categoryId: savedProduct.categoryId,
      quantity: savedProduct.quantity,
      price: savedProduct.price,
      description: savedProduct.description,
      isActive: savedProduct.isActive,
      createdAt: savedProduct.createdAt,
      updatedAt: savedProduct.updatedAt,
      category: product.category ? {
        id: product.category.id,
        name: product.category.name,
        description: product.category.description,
        createdAt: product.category.createdAt,
        updatedAt: product.category.updatedAt,
      } : undefined,
    };
  }
}
