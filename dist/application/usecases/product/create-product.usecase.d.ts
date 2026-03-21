import type { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import type { ICategoryRepository } from '../../../domain/repositories/category.repository.interface';
import { CreateProductDto } from '../../dtos/product/create-product.dto';
import { ProductResponseDto } from '../../dtos/product/product-response.dto';
import { CreateStockEntryUseCase } from '../stock/create-stock-entry.usecase';
export declare class CreateProductUseCase {
    private readonly productRepository;
    private readonly categoryRepository;
    private readonly createStockEntryUseCase;
    constructor(productRepository: IProductRepository, categoryRepository: ICategoryRepository, createStockEntryUseCase: CreateStockEntryUseCase);
    execute(dto: CreateProductDto, userId: string): Promise<ProductResponseDto>;
}
