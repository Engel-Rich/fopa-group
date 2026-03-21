import { Repository } from 'typeorm';
import type { ICustomerProductPriceRepository } from 'src/domain/repositories/customer-product-price.repository.interface';
import { CustomerProductPriceEntity } from '../database/entities/customer-product-price.entity';
export declare class CustomerProductPriceRepository implements ICustomerProductPriceRepository {
    private readonly repository;
    constructor(repository: Repository<CustomerProductPriceEntity>);
    findByCustomerId(customerId: string): Promise<Array<{
        productId: string;
        unitPrice: number;
    }>>;
    findOne(customerId: string, productId: string): Promise<{
        productId: string;
        unitPrice: number;
    } | null>;
    upsert(customerId: string, productId: string, unitPrice: number): Promise<void>;
}
