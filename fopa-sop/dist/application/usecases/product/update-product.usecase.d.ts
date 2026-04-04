import type { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import type { ICategoryRepository } from '../../../domain/repositories/category.repository.interface';
import { UpdateProductDto } from '../../dtos/product/update-product.dto';
import { ProductResponseDto } from '../../dtos/product/product-response.dto';
export declare class UpdateProductUseCase {
    private readonly productRepository;
    private readonly categoryRepository;
    constructor(productRepository: IProductRepository, categoryRepository: ICategoryRepository);
    execute(id: string, dto: UpdateProductDto): Promise<ProductResponseDto>;
}
