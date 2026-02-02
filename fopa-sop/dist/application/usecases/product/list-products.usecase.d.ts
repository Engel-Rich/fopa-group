import type { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import { ProductResponseDto } from '../../dtos/product/product-response.dto';
export declare class ListProductsUseCase {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    execute(activeOnly?: boolean): Promise<ProductResponseDto[]>;
}
