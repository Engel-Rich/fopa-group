import type { ICategoryRepository } from '../../../domain/repositories/category.repository.interface';
import { CategoryResponseDto } from '../../dtos/category/category-response.dto';
export declare class ListCategoriesUseCase {
    private readonly categoryRepository;
    constructor(categoryRepository: ICategoryRepository);
    execute(): Promise<CategoryResponseDto[]>;
}
