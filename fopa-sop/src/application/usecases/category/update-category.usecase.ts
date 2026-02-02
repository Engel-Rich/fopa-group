import { Injectable, Inject } from '@nestjs/common';
import type { ICategoryRepository } from '../../../domain/repositories/category.repository.interface';
import { NotFoundException, AlreadyExistsException } from '../../../shared/exceptions/business.exception';
import { UpdateCategoryDto } from '../../dtos/category/update-category.dto';
import { CategoryResponseDto } from '../../dtos/category/category-response.dto';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) { }

  async execute(id: string, dto: UpdateCategoryDto): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException('Catégorie');
    }

    // Vérifier si un autre nom existe déjà (sauf si c'est la même catégorie)
    if (dto.name && dto.name !== category.name) {
      const existingCategory = await this.categoryRepository.findByName(dto.name);
      if (existingCategory && existingCategory.id !== id) {
        throw new AlreadyExistsException('Une catégorie avec ce nom existe déjà');
      }
    }

    const updatedCategory = await this.categoryRepository.update(id, dto);

    return {
      id: updatedCategory.id,
      name: updatedCategory.name,
      description: updatedCategory.description,
      createdAt: updatedCategory.createdAt,
      updatedAt: updatedCategory.updatedAt,
    };
  }
}
