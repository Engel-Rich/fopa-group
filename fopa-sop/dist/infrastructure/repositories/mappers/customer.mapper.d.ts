import { Customer } from '../../../domain/entities/customer.entity';
import { CustomerEntity } from '../../database/entities/customer.entity';
export declare class CustomerMapper {
    static toDomain(entity: CustomerEntity): Customer;
    static toEntity(domain: Customer, userId: string): CustomerEntity;
}
