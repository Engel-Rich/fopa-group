import { Repository } from 'typeorm';
import type { IProductRepository } from 'src/domain/repositories/product.repository.interface';
import { Product } from 'src/domain/entities/product.entity';
import { ProductEntity } from '../database/entities/product.entity';
export declare class ProductRepository implements IProductRepository {
    private readonly repository;
    constructor(repository: Repository<ProductEntity>);
    create(product: Product): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    findByCategoryId(categoryId: string): Promise<Product[]>;
    findActiveProducts(): Promise<Product[]>;
    update(id: string, product: Partial<Product>): Promise<Product>;
    delete(id: string): Promise<void>;
    updateStock(id: string, quantity: number): Promise<Product>;
}
