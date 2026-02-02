import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IProductRepository } from 'src/domain/repositories/product.repository.interface';
import { Product } from 'src/domain/entities/product.entity';
import { ProductEntity } from '../database/entities/product.entity';
import { ProductMapper } from './mappers/product.mapper';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) { }

  async create(product: Product): Promise<Product> {
    const entity = ProductMapper.toEntity(product);
    const saved = await this.repository.save(entity);
    return ProductMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Product | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['category'],
    });
    return entity ? ProductMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<Product[]> {
    const entities = await this.repository.find({ relations: ['category'] });
    return entities.map((entity) => ProductMapper.toDomain(entity));
  }

  async findByCategoryId(categoryId: string): Promise<Product[]> {
    const entities = await this.repository.find({
      where: { categoryId },
      relations: ['category'],
    });
    return entities.map((entity) => ProductMapper.toDomain(entity));
  }

  async findActiveProducts(): Promise<Product[]> {
    const entities = await this.repository.find({
      where: { isActive: true },
      relations: ['category'],
    });
    return entities.map((entity) => ProductMapper.toDomain(entity));
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    await this.repository.update(id, product);
    const updated = await this.repository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!updated) {
      throw new Error('Product not found');
    }
    return ProductMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new Error('Product not found');
    }
    entity.quantity += quantity;
    if (entity.quantity < 0) {
      throw new Error('Stock insuffisant');
    }
    const updated = await this.repository.save(entity);
    return ProductMapper.toDomain(updated);
  }
}
