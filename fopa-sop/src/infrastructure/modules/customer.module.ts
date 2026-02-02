import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from '../../presentation/controllers/customer.controller';
import { CreateCustomerUseCase } from '../../application/usecases/customer/create-customer.usecase';
import { ListCustomersUseCase } from '../../application/usecases/customer/list-customers.usecase';
import { UpdateCustomerUseCase } from '../../application/usecases/customer/update-customer.usecase';
import { CustomerRepository } from '../repositories/customer.repository';
import { UserRepository } from '../repositories/user.repository';
import { CustomerEntity } from '../database/entities/customer.entity';
import { UserEntity } from '../database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, UserEntity])],
  controllers: [CustomerController],
  providers: [
    CreateCustomerUseCase,
    ListCustomersUseCase,
    UpdateCustomerUseCase,
    {
      provide: 'ICustomerRepository',
      useClass: CustomerRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: ['ICustomerRepository'],
})
export class CustomerModule {}
