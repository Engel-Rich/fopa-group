import { Injectable, Inject } from '@nestjs/common';
import type { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import type { ICategoryRepository } from '../../../domain/repositories/category.repository.interface';
import { NotFoundException } from '../../../shared/exceptions/business.exception';
import { UpdateProductDto } from '../../dtos/product/update-product.dto';
import { ProductResponseDto } from '../../dtos/product/product-response.dto';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) { }

  async execute(id: string, dto: UpdateProductDto): Promise<ProductResponseDto> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Produit');
    }

    if (dto.categoryId) {
      const category = await this.categoryRepository.findById(dto.categoryId);
      if (!category) {
        throw new NotFoundException('Catégorie');
      }
    }

    const updatedProduct = await this.productRepository.update(id, dto);

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
