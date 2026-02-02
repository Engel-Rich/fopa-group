import { Injectable, Inject } from '@nestjs/common';
import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { NotFoundException, AlreadyExistsException } from '../../../shared/exceptions/business.exception';
import { CreateCustomerDto } from '../../dtos/customer/create-customer.dto';
import { CustomerResponseDto } from '../../dtos/customer/customer-response.dto';
import { Customer } from '../../../domain/entities/customer.entity';
import { UserRole } from '../../../domain/entities/user.entity';
import { UserMapper } from 'src/infrastructure/repositories/mappers/user.mapper';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(dto: CreateCustomerDto): Promise<CustomerResponseDto> {
    if (dto.user.email) {
      const existingUser = await this.userRepository.findByEmail(dto.user.email);
      if (existingUser) {
        throw new AlreadyExistsException('Un utilisateur avec cet email existe déjà');
      }
    }
    const existingUsername = await this.userRepository.findByUsername(dto.user.username);
    if (existingUsername) {
      throw new AlreadyExistsException('Un utilisateur avec ce nom d\'utilisateur existe déjà');
    }
    const existingPhone = await this.userRepository.findByPhone(dto.user.phone);
    if (existingPhone) {
      throw new AlreadyExistsException('Un utilisateur avec ce numéro de téléphone existe déjà');
    }

    dto.user.role = UserRole.CLIENT;
    // Vérifier que l'utilisateur existe et est de type CLIENT
    const user = UserMapper.toModelFromDto(dto.user);
    const savedUser = await this.userRepository.create(user);

    // Créer le client avec les données de l'utilisateur
    const customer = new Customer(
      user.name,
      user.password,
      user.username,
      dto.address,
      savedUser.id,
      user.email,
      user.phone,
    );

    const savedCustomer = await this.customerRepository.create(customer, savedUser.id);

    return {
      id: savedCustomer.id,
      userId: savedCustomer.userId,
      user: {
        id: savedUser.id,
        email: user.email,
        name: savedUser.name,
        phone: savedUser.phone,
        username: savedUser.username,
        role: savedUser.role,
        isActive: savedUser.isActive,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
      },
      address: savedCustomer.address,
      currentDebt: savedCustomer.currentDebt,
      currentPackagesDebt: savedCustomer.currentPackagesDebt,
      createdAt: savedCustomer.createdAt,
      updatedAt: savedCustomer.updatedAt,
    };
  }
}
