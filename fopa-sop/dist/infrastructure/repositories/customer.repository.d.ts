import { Repository } from 'typeorm';
import type { ICustomerRepository } from 'src/domain/repositories/customer.repository.interface';
import { Customer } from 'src/domain/entities/customer.entity';
import { CustomerEntity } from '../database/entities/customer.entity';
import { UpdateCustomerDto } from 'src/application/dtos/customer/update-customer.dto';
export declare class CustomerRepository implements ICustomerRepository {
    private readonly repository;
    constructor(repository: Repository<CustomerEntity>);
    create(customer: Customer, userId: string): Promise<Customer>;
    findById(id: string): Promise<Customer | null>;
    findByUserId(userId: string): Promise<Customer | null>;
    findByPhone(phone: string): Promise<Customer | null>;
    findAll(): Promise<Customer[]>;
    findActiveCustomers(): Promise<Customer[]>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer>;
    delete(id: string): Promise<void>;
    updateDebt(id: string, debt: number): Promise<Customer>;
    updatePackagesDebt(id: string, packagesDebt: number): Promise<Customer>;
}
