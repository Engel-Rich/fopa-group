import { CreateProductUseCase } from '../../application/usecases/product/create-product.usecase';
import { UpdateProductUseCase } from '../../application/usecases/product/update-product.usecase';
import { ListProductsUseCase } from '../../application/usecases/product/list-products.usecase';
import { CreateProductDto } from '../../application/dtos/product/create-product.dto';
import { UpdateProductDto } from '../../application/dtos/product/update-product.dto';
import { ProductResponseDto } from '../../application/dtos/product/product-response.dto';
import { ProductWithConfigDto } from '../../application/dtos/product/product-with-config.dto';
import { ListProductsWithConfigUseCase } from '../../application/usecases/product/list-products-with-config.usecase';
export declare class ProductController {
    private readonly createProductUseCase;
    private readonly updateProductUseCase;
    private readonly listProductsUseCase;
    private readonly listProductsWithConfigUseCase;
    constructor(createProductUseCase: CreateProductUseCase, updateProductUseCase: UpdateProductUseCase, listProductsUseCase: ListProductsUseCase, listProductsWithConfigUseCase: ListProductsWithConfigUseCase);
    create(dto: CreateProductDto, user: any): Promise<ProductResponseDto>;
    findAll(activeOnly?: string): Promise<ProductResponseDto[]>;
    update(id: string, dto: UpdateProductDto): Promise<ProductResponseDto>;
    findAllForCustomer(customerId: string, activeOnly?: string): Promise<ProductWithConfigDto[]>;
}
