import { Injectable, Inject } from '@nestjs/common';
import type { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import { ProductResponseDto } from '../../dtos/product/product-response.dto';

@Injectable()
export class ListProductsUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) { }

  async execute(activeOnly: boolean = false): Promise<ProductResponseDto[]> {
    const products = activeOnly
      ? await this.productRepository.findActiveProducts()
      : await this.productRepository.findAll();

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      categoryId: product.categoryId,
      quantity: product.quantity,
      category: product.category ? {
        id: product.category.id,
        name: product.category.name,
        description: product.category.description,
        createdAt: product.category.createdAt,
        updatedAt: product.category.updatedAt,
      } : undefined,
      price: product.price,
      description: product.description,
      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));
  }
}
