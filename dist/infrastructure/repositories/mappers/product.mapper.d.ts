import { Product } from '../../../domain/entities/product.entity';
import { ProductEntity } from '../../database/entities/product.entity';
export declare class ProductMapper {
    static toDomain(entity: ProductEntity): Product;
    static toEntity(domain: Product): ProductEntity;
}
