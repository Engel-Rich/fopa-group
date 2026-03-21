import { Product } from '../../../domain/entities/product.entity';
import { ProductEntity } from '../../database/entities/product.entity';
import { CategoryMapper } from './category.mapper';

export class ProductMapper {
  static toDomain(entity: ProductEntity): Product {
    const product = new Product(
      entity.name,
      entity.categoryId,
      entity.quantity,
      parseFloat(entity.price.toString()),
      entity.description,
    );
    product.id = entity.id;
    product.isActive = entity.isActive;
    product.createdAt = entity.createdAt;
    product.updatedAt = entity.updatedAt;
    if (entity.category) {
      product.category = CategoryMapper.toDomain(entity.category);
    }
    return product;
  }

  static toEntity(domain: Product): ProductEntity {
    const entity = new ProductEntity();
    if (domain.id) entity.id = domain.id;
    entity.name = domain.name;
    entity.categoryId = domain.categoryId;
    entity.quantity = domain.quantity;
    entity.price = domain.price;
    entity.description = domain.description || '';
    entity.isActive = domain.isActive;
    if (domain.createdAt) entity.createdAt = domain.createdAt;
    if (domain.updatedAt) entity.updatedAt = domain.updatedAt;
    return entity;
  }
}
