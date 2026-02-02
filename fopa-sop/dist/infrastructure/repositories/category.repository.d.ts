import { Repository } from 'typeorm';
import { CategoryEntity } from '../database/entities/category.entity';
import type { ICategoryRepository } from 'src/domain/repositories/category.repository.interface';
import { Category } from 'src/domain/entities/category.entity';
export declare class CategoryRepository implements ICategoryRepository {
    private readonly repository;
    constructor(repository: Repository<CategoryEntity>);
    create(category: Category): Promise<Category>;
    findById(id: string): Promise<Category | null>;
    findByName(name: string): Promise<Category | null>;
    findAll(): Promise<Category[]>;
    update(id: string, category: Partial<Category>): Promise<Category>;
    delete(id: string): Promise<void>;
}
