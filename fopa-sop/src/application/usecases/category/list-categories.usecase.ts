import { Injectable, Inject } from '@nestjs/common';
import type { ICategoryRepository } from '../../../domain/repositories/category.repository.interface';
import { CategoryResponseDto } from '../../dtos/category/category-response.dto';

@Injectable()
export class ListCategoriesUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryRepository.findAll();

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }));
  }
}
