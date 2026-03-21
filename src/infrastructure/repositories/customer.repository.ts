import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { ICustomerRepository } from 'src/domain/repositories/customer.repository.interface';
import { Customer } from 'src/domain/entities/customer.entity';
import { CustomerEntity } from '../database/entities/customer.entity';
import { CustomerMapper } from './mappers/customer.mapper';
import { UpdateCustomerDto } from 'src/application/dtos/customer/update-customer.dto';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
  ) { }

  async create(customer: Customer, userId: string): Promise<Customer> {
    const entity = CustomerMapper.toEntity(customer, userId);
    const saved = await this.repository.save(entity);
    const fullEntity = await this.repository.findOne({
      where: { id: saved.id },
      relations: ['user'],
    });
    if (!fullEntity) {
      throw new Error('Customer not found after creation');
    }
    return CustomerMapper.toDomain(fullEntity);
  }

  async findById(id: string): Promise<Customer | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });
    return entity ? CustomerMapper.toDomain(entity) : null;
  }

  async findByUserId(userId: string): Promise<Customer | null> {
    const entity = await this.repository.findOne({
      where: { userId },
      relations: ['user'],
    });
    return entity ? CustomerMapper.toDomain(entity) : null;
  }

  async findByPhone(phone: string): Promise<Customer | null> {
    const entity = await this.repository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.user', 'user')
      .where('user.phone = :phone', { phone })
      .getOne();
    return entity ? CustomerMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<Customer[]> {
    const entities = await this.repository.find({
      relations: ['user'],
    });
    return entities.map((entity) => CustomerMapper.toDomain(entity));
  }

  async findActiveCustomers(): Promise<Customer[]> {
    const entities = await this.repository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.user', 'user')
      .where('user.isActive = :isActive', { isActive: true })
      .getMany();
    return entities.map((entity) => CustomerMapper.toDomain(entity));
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    await this.repository.update(id, {
      address: updateCustomerDto.address,
      ...(updateCustomerDto.user && {
        user: {
          ... (updateCustomerDto.user.email && { email: updateCustomerDto.user.email }),
          ... (updateCustomerDto.user.name && { name: updateCustomerDto.user.name }),
          ... (updateCustomerDto.user.phone && { phone: updateCustomerDto.user.phone }),
          ... (updateCustomerDto.user.username && { username: updateCustomerDto.user.username }),
        }
      }),
    });
    const updated = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!updated) {
      throw new Error('Customer not found');
    }
    return CustomerMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async updateDebt(id: string, debt: number): Promise<Customer> {
    await this.repository.update(id, { currentDebt: debt });
    const updated = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!updated) {
      throw new Error('Customer not found');
    }
    return CustomerMapper.toDomain(updated);
  }

  async updatePackagesDebt(id: string, packagesDebt: number): Promise<Customer> {
    await this.repository.update(id, { currentPackagesDebt: packagesDebt });
    const updated = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!updated) {
      throw new Error('Customer not found');
    }
    return CustomerMapper.toDomain(updated);
  }
}
