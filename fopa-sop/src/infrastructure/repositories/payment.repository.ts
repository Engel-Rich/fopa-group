import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import type { IPaymentRepository } from 'src/domain/repositories/payment.repository.interface';
import { Payment } from 'src/domain/entities/payment.entity';
import { PaymentEntity } from '../database/entities/payment.entity';
import { PaymentMapper } from './mappers/payment.mapper';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repository: Repository<PaymentEntity>,
  ) { }

  async create(payment: Payment): Promise<Payment> {
    const entity = PaymentMapper.toEntity(payment);
    const saved = await this.repository.save(entity);
    return PaymentMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Payment | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['order', 'user'],
    });
    return entity ? PaymentMapper.toDomain(entity) : null;
  }

  async findByOrderId(orderId: string): Promise<Payment[]> {
    const entities = await this.repository.find({
      where: { orderId },
      relations: ['order', 'user'],
      order: { createdAt: 'DESC' },
    });
    return entities.map((entity) => PaymentMapper.toDomain(entity));
  }

  async findAll(): Promise<Payment[]> {
    const entities = await this.repository.find({
      relations: ['order', 'user'],
      order: { createdAt: 'DESC' },
    });
    return entities.map((entity) => PaymentMapper.toDomain(entity));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Payment[]> {
    const entities = await this.repository.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
      relations: ['order', 'user'],
      order: { createdAt: 'DESC' },
    });
    return entities.map((entity) => PaymentMapper.toDomain(entity));
  }

  async update(id: string, payment: Partial<Payment>): Promise<Payment> {
    await this.repository.update(id, payment);
    const updated = await this.repository.findOne({
      where: { id },
      relations: ['order', 'user'],
    });
    if (!updated) {
      throw new Error('Payment not found');
    }
    return PaymentMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
