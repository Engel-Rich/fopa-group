import { CreateCategoryUseCase } from '../../application/usecases/category/create-category.usecase';
import { ListCategoriesUseCase } from '../../application/usecases/category/list-categories.usecase';
import { CreateCategoryDto } from '../../application/dtos/category/create-category.dto';
import { CategoryResponseDto } from '../../application/dtos/category/category-response.dto';
import { UpdateCategoryDto } from 'src/application/dtos/category/update-category.dto';
import { UpdateCategoryUseCase } from 'src/application/usecases/category/update-category.usecase';
import { DeleteCategoryUseCase } from 'src/application/usecases/category/delete-category.usecase';
export declare class CategoryController {
    private readonly createCategoryUseCase;
    private readonly listCategoriesUseCase;
    private readonly updateCategoryUseCase;
    private readonly deleteCategoryUseCase;
    constructor(createCategoryUseCase: CreateCategoryUseCase, listCategoriesUseCase: ListCategoriesUseCase, updateCategoryUseCase: UpdateCategoryUseCase, deleteCategoryUseCase: DeleteCategoryUseCase);
    create(dto: CreateCategoryDto): Promise<CategoryResponseDto>;
    findAll(): Promise<CategoryResponseDto[]>;
    update(id: string, dto: UpdateCategoryDto): Promise<CategoryResponseDto>;
    delete(id: string): Promise<void>;
}
