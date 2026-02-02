import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import type { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { CreateCustomerDto } from '../../dtos/customer/create-customer.dto';
import { CustomerResponseDto } from '../../dtos/customer/customer-response.dto';
export declare class CreateCustomerUseCase {
    private readonly customerRepository;
    private readonly userRepository;
    constructor(customerRepository: ICustomerRepository, userRepository: IUserRepository);
    execute(dto: CreateCustomerDto): Promise<CustomerResponseDto>;
}
