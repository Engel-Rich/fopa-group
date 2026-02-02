import { Category } from '../../../domain/entities/category.entity';
import { CategoryEntity } from '../../database/entities/category.entity';
export declare class CategoryMapper {
    static toDomain(entity: CategoryEntity): Category;
    static toEntity(domain: Category): CategoryEntity;
}
