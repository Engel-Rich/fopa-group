import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IPackageTransactionRepository } from 'src/domain/repositories/package-transaction.repository.interface';
import { PackageTransaction } from 'src/domain/entities/package-transaction.entity';
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
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
    return entities.map(PackageTransactionMapper.toDomain);
  }
}
