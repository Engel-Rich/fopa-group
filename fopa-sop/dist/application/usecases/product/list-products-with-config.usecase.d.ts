import type { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import type { ICustomerProductPriceRepository } from '../../../domain/repositories/customer-product-price.repository.interface';
import { ProductWithConfigDto } from '../../dtos/product/product-with-config.dto';
export declare class ListProductsWithConfigUseCase {
    private readonly productRepository;
    private readonly customerRepository;
    private readonly customerProductPriceRepository;
    constructor(productRepository: IProductRepository, customerRepository: ICustomerRepository, customerProductPriceRepository: ICustomerProductPriceRepository);
    execute(customerId: string, activeOnly?: boolean): Promise<ProductWithConfigDto[]>;
}
