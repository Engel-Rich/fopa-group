import type { ICategoryRepository } from '../../../domain/repositories/category.repository.interface';
import { CreateCategoryDto } from '../../dtos/category/create-category.dto';
import { CategoryResponseDto } from '../../dtos/category/category-response.dto';
export declare class CreateCategoryUseCase {
    private readonly categoryRepository;
    constructor(categoryRepository: ICategoryRepository);
    execute(dto: CreateCategoryDto): Promise<CategoryResponseDto>;
}
