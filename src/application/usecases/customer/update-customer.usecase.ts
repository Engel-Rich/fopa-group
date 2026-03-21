import { Injectable, Inject } from '@nestjs/common';
import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import { AlreadyExistsException, NotFoundException } from '../../../shared/exceptions/business.exception';
import { UpdateCustomerDto } from '../../dtos/customer/update-customer.dto';
import { CustomerResponseDto } from '../../dtos/customer/customer-response.dto';
import type { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { UserMapper } from 'src/infrastructure/repositories/mappers/user.mapper';

@Injectable()
export class UpdateCustomerUseCase {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(id: string, dto: UpdateCustomerDto): Promise<CustomerResponseDto> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new NotFoundException('Client');
    }
    if (dto.user) {
      const existingUser = await this.userRepository.findByEmail(customer.email);
      if (existingUser) {
        throw new NotFoundException('Aucun utilisateur trouvé avec ces informations');
      }
    }

    const updatedCustomer = await this.customerRepository.update(id, dto);

    return {
      id: updatedCustomer.id,
      userId: updatedCustomer.userId,
      user: {
        id: updatedCustomer.userId,
        email: updatedCustomer.email,
        name: updatedCustomer.name,
        phone: updatedCustomer.phone,
        username: updatedCustomer.username,
        role: updatedCustomer.role,
        isActive: updatedCustomer.isActive,
        createdAt: updatedCustomer.createdAt,
        updatedAt: updatedCustomer.updatedAt,
      },
      address: updatedCustomer.address,
      currentDebt: updatedCustomer.currentDebt,
      currentPackagesDebt: updatedCustomer.currentPackagesDebt,
      createdAt: updatedCustomer.createdAt,
      updatedAt: updatedCustomer.updatedAt,
    };
  }
}
