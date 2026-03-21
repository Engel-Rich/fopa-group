import { Injectable, Inject } from '@nestjs/common';
import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import { CustomerResponseDto } from '../../dtos/customer/customer-response.dto';

@Injectable()
export class ListCustomersUseCase {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
  ) { }

  async execute(activeOnly: boolean = false): Promise<CustomerResponseDto[]> {
    const customers = activeOnly
      ? await this.customerRepository.findActiveCustomers()
      : await this.customerRepository.findAll();

    return customers.map((customer) => ({
      id: customer.id,
      userId: customer.userId,
      user: {
        id: customer.userId,
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
        username: customer.username,
        role: customer.role,
        isActive: customer.isActive,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      },
      address: customer.address,
      currentDebt: customer.currentDebt,
      currentPackagesDebt: customer.currentPackagesDebt ?? 0,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }));
  }
}
