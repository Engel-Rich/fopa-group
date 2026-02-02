import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../database/entities/category.entity';
import { CategoryMapper } from './mappers/category.mapper';
import type { ICategoryRepository } from 'src/domain/repositories/category.repository.interface';
import { Category } from 'src/domain/entities/category.entity';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) { }

  async create(category: Category): Promise<Category> {
    const entity = CategoryMapper.toEntity(category);
    const saved = await this.repository.save(entity);
    return CategoryMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Category | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? CategoryMapper.toDomain(entity) : null;
  }

  async findByName(name: string): Promise<Category | null> {
    const entity = await this.repository.findOne({ where: { name } });
    return entity ? CategoryMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<Category[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => CategoryMapper.toDomain(entity));
  }

  async update(id: string, category: Partial<Category>): Promise<Category> {
    await this.repository.update(id, category);
    const updated = await this.repository.findOne({ where: { id } });
    if (!updated) {
      throw new Error('Category not found');
    }
    return CategoryMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
