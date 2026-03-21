import { Injectable, Inject } from '@nestjs/common';
import type { ICategoryRepository } from '../../../domain/repositories/category.repository.interface';
import { AlreadyExistsException } from '../../../shared/exceptions/business.exception';
import { CreateCategoryDto } from '../../dtos/category/create-category.dto';
import { CategoryResponseDto } from '../../dtos/category/category-response.dto';
import { Category } from '../../../domain/entities/category.entity';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const existingCategory = await this.categoryRepository.findByName(dto.name);
    if (existingCategory) {
      throw new AlreadyExistsException('Une catégorie avec ce nom existe déjà');
    }

    const category = new Category(dto.name, dto.description);

    const savedCategory = await this.categoryRepository.create(category);

    return {
      id: savedCategory.id,
      name: savedCategory.name,
      description: savedCategory.description,
      createdAt: savedCategory.createdAt,
      updatedAt: savedCategory.updatedAt,
    };
  }
}
