import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type {
  IPackageTransactionRepository,
  PackageTransactionFilters,
  PackageTransactionTotals,
} from 'src/domain/repositories/package-transaction.repository.interface';
import { PackageTransaction, PackageTransactionType } from 'src/domain/entities/package-transaction.entity';
import { PackageTransactionEntity } from '../database/entities/package-transaction.entity';
import { PackageTransactionMapper } from './mappers/package-transaction.mapper';

@Injectable()
export class PackageTransactionRepository implements IPackageTransactionRepository {
  constructor(
    @InjectRepository(PackageTransactionEntity)
    private readonly repository: Repository<PackageTransactionEntity>,
  ) {}

  async create(transaction: PackageTransaction): Promise<PackageTransaction> {
    const entity = PackageTransactionMapper.toEntity(transaction);
    const saved = await this.repository.save(entity);
    const full = await this.repository.findOne({
      where: { id: saved.id },
      relations: ['user'],
    });
    if (!full) throw new Error('PackageTransaction not found after creation');
    return PackageTransactionMapper.toDomain(full);
  }

  async findByCustomerId(customerId: string): Promise<PackageTransaction[]> {
    const entities = await this.repository.find({
      where: { customerId },
      relations: ['user', 'customer', 'customer.user'],
      order: { createdAt: 'DESC' },
    });
    return entities.map(PackageTransactionMapper.toDomain);
  }

  async findAll(
    filters: PackageTransactionFilters = {},
  ): Promise<{ data: PackageTransaction[]; total: number }> {
    const qb = this.repository
      .createQueryBuilder('tx')
      .leftJoinAndSelect('tx.user', 'user')
      .leftJoinAndSelect('tx.customer', 'customer')
      .leftJoinAndSelect('customer.user', 'customerUser')
      .orderBy('tx.createdAt', 'DESC');

    if (filters.type) {
      qb.andWhere('tx.type = :type', { type: filters.type });
    }
    if (filters.from) {
      qb.andWhere('tx.createdAt >= :from', { from: filters.from });
    }
    if (filters.to) {
      qb.andWhere('tx.createdAt <= :to', { to: filters.to });
    }

    qb.take(filters.limit ?? 50).skip(filters.offset ?? 0);

    const [entities, total] = await qb.getManyAndCount();
    return { data: entities.map(PackageTransactionMapper.toDomain), total };
  }

  async getTotals(): Promise<PackageTransactionTotals> {
    const rows: { type: PackageTransactionType; total: string | null }[] = await this.repository
      .createQueryBuilder('tx')
      .select('tx.type', 'type')
      .addSelect('COALESCE(SUM(tx.quantity), 0)', 'total')
      .groupBy('tx.type')
      .getRawMany();

    const totals: PackageTransactionTotals = { totalLent: 0, totalReturned: 0 };
    for (const row of rows) {
      const value = parseInt(row.total ?? '0', 10) || 0;
      if (row.type === PackageTransactionType.LEND) totals.totalLent = value;
      if (row.type === PackageTransactionType.RETURN) totals.totalReturned = value;
    }
    return totals;
  }
}
