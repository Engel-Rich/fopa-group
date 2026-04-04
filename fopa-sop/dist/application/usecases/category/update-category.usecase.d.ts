import type { ICategoryRepository } from '../../../domain/repositories/category.repository.interface';
import { UpdateCategoryDto } from '../../dtos/category/update-category.dto';
import { CategoryResponseDto } from '../../dtos/category/category-response.dto';
export declare class UpdateCategoryUseCase {
    private readonly categoryRepository;
    constructor(categoryRepository: ICategoryRepository);
    execute(id: string, dto: UpdateCategoryDto): Promise<CategoryResponseDto>;
}
