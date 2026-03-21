import { Injectable, Inject } from '@nestjs/common';
import type { ICategoryRepository } from '../../../domain/repositories/category.repository.interface';
import type { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import { NotFoundException, BusinessException } from '../../../shared/exceptions/business.exception';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException('Catégorie');
    }

    // Vérifier s'il y a des produits associés à cette catégorie
    const products = await this.productRepository.findByCategoryId(id);
    if (products.length > 0) {
      throw new BusinessException(
        `Impossible de supprimer cette catégorie car ${products.length} produit(s) y sont associé(s)`,
      );
    }

    await this.categoryRepository.delete(id);
  }
}
