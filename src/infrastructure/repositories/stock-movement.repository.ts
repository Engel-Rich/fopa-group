import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import type { IStockMovementRepository } from 'src/domain/repositories/stock-movement.repository.interface';
import { StockMovement, StockMovementType } from 'src/domain/entities/stock-movement.entity';
import { StockMovementEntity } from '../database/entities/stock-movement.entity';
import { StockMovementMapper } from './mappers/stock-movement.mapper';

@Injectable()
export class StockMovementRepository implements IStockMovementRepository {
  constructor(
    @InjectRepository(StockMovementEntity)
    private readonly repository: Repository<StockMovementEntity>,
  ) { }

  async create(movement: StockMovement): Promise<StockMovement> {
    const entity = StockMovementMapper.toEntity(movement);
    const saved = await this.repository.save(entity);
    return StockMovementMapper.toDomain(saved);
  }

  async findById(id: string): Promise<StockMovement | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['product', 'user'],
    });
    return entity ? StockMovementMapper.toDomain(entity) : null;
  }

  async findByProductId(productId: string): Promise<StockMovement[]> {
    const entities = await this.repository.find({
      where: { productId },
      relations: ['product', 'user'],
      order: { createdAt: 'DESC' },
    });
    return entities.map((entity) => StockMovementMapper.toDomain(entity));
  }

  async findByProductIdPaginated(
    productId: string,
    page: number,
    limit: number,
  ): Promise<{ data: StockMovement[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;
    const [entities, total] = await this.repository.findAndCount({
      where: { productId },
      relations: ['product', 'user'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data: entities.map((entity) => StockMovementMapper.toDomain(entity)),
      total,
      page,
      limit,
    };
  }

  async findByType(type: StockMovementType): Promise<StockMovement[]> {
    const entities = await this.repository.find({
      where: { type },
      relations: ['product', 'user'],
      order: { createdAt: 'DESC' },
    });
    return entities.map((entity) => StockMovementMapper.toDomain(entity));
  }

  async findAll(): Promise<StockMovement[]> {
    const entities = await this.repository.find({
      relations: ['product', 'user'],
      order: { createdAt: 'DESC' },
    });
    return entities.map((entity) => StockMovementMapper.toDomain(entity));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<StockMovement[]> {
    const entities = await this.repository
      .createQueryBuilder('movement')
      .where('movement.createdAt >= :startDate', { startDate })
      .andWhere('movement.createdAt <= :endDate', { endDate })
      .leftJoinAndSelect('movement.product', 'product')
      .leftJoinAndSelect('movement.user', 'user')
      .orderBy('movement.createdAt', 'DESC')
      .getMany();

    return entities.map((entity) => StockMovementMapper.toDomain(entity));
  }

  async findByProductAndDateRange(
    productId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<StockMovement[]> {
    const entities = await this.repository
      .createQueryBuilder('movement')
      .where('movement.productId = :productId', { productId })
      .andWhere('movement.createdAt >= :startDate', { startDate })
      .andWhere('movement.createdAt <= :endDate', { endDate })
      .leftJoinAndSelect('movement.product', 'product')
      .leftJoinAndSelect('movement.user', 'user')
      .orderBy('movement.createdAt', 'DESC')
      .getMany();

    return entities.map((entity) => StockMovementMapper.toDomain(entity));
  }
}
