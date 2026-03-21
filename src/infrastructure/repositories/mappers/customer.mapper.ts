import { Customer } from '../../../domain/entities/customer.entity';
import { CustomerEntity } from '../../database/entities/customer.entity';
import { UserMapper } from './user.mapper';

export class CustomerMapper {
  static toDomain(entity: CustomerEntity): Customer {
    if (!entity.user) {
      throw new Error('User is required for Customer');
    }
    const user = UserMapper.toDomain(entity.user);
    const customer = new Customer(
      user.name,
      user.password,
      user.username,
      entity.address,
      entity.userId,
      user.email,
      user.phone,
    );
    customer.id = entity.id;
    customer.currentDebt = parseFloat(entity.currentDebt.toString());
    customer.currentPackagesDebt = parseInt((entity.currentPackagesDebt ?? 0).toString(), 10);
    customer.isActive = user.isActive;
    customer.role = user.role;
    customer.createdAt = entity.createdAt;
    customer.updatedAt = entity.updatedAt;
    return customer;
  }

  static toEntity(domain: Customer, userId: string): CustomerEntity {
    const entity = new CustomerEntity();
    if (domain.id) entity.id = domain.id;
    entity.userId = userId;
    entity.address = domain.address || undefined;
    entity.currentDebt = domain.currentDebt;
    entity.currentPackagesDebt = domain.currentPackagesDebt ?? 0;
    if (domain.createdAt) entity.createdAt = domain.createdAt;
    if (domain.updatedAt) entity.updatedAt = domain.updatedAt;
    return entity;
  }
}
