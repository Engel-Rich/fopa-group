import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { ICustomerProductPriceRepository } from 'src/domain/repositories/customer-product-price.repository.interface';
import { CustomerProductPriceEntity } from '../database/entities/customer-product-price.entity';

@Injectable()
export class CustomerProductPriceRepository implements ICustomerProductPriceRepository {
  constructor(
    @InjectRepository(CustomerProductPriceEntity)
    private readonly repository: Repository<CustomerProductPriceEntity>,
  ) { }

  async findByCustomerId(customerId: string): Promise<Array<{ productId: string; unitPrice: number }>> {
    const rows = await this.repository.find({ where: { customerId } });
    return rows.map((row) => ({ productId: row.productId, unitPrice: Number(row.unitPrice) }));
  }

  async findOne(customerId: string, productId: string): Promise<{ productId: string; unitPrice: number } | null> {
    const row = await this.repository.findOne({ where: { customerId, productId } });
    if (!row) {
      return null;
    }
    return { productId: row.productId, unitPrice: Number(row.unitPrice) };
  }

  async upsert(customerId: string, productId: string, unitPrice: number): Promise<void> {
    await this.repository.upsert(
      { customerId, productId, unitPrice },
      ['customerId', 'productId'],
    );
  }
}
