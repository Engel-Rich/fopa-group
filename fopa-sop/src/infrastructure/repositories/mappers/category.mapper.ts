import { Category } from '../../../domain/entities/category.entity';
import { CategoryEntity } from '../../database/entities/category.entity';

export class CategoryMapper {
  static toDomain(entity: CategoryEntity): Category {
    const category = new Category(entity.name, entity.description);
    category.id = entity.id;
    category.createdAt = entity.createdAt;
    category.updatedAt = entity.updatedAt;
    return category;
  }

  static toEntity(domain: Category): CategoryEntity {
    const entity = new CategoryEntity();
    if (domain.id) entity.id = domain.id;
    entity.name = domain.name;
    entity.description = domain.description || '';
    if (domain.createdAt) entity.createdAt = domain.createdAt;
    if (domain.updatedAt) entity.updatedAt = domain.updatedAt;
    return entity;
  }
}
