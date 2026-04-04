import type { ICategoryRepository } from '../../../domain/repositories/category.repository.interface';
import type { IProductRepository } from '../../../domain/repositories/product.repository.interface';
export declare class DeleteCategoryUseCase {
    private readonly categoryRepository;
    private readonly productRepository;
    constructor(categoryRepository: ICategoryRepository, productRepository: IProductRepository);
    execute(id: string): Promise<void>;
}
