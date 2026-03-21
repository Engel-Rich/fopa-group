import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import { UpdateCustomerDto } from '../../dtos/customer/update-customer.dto';
import { CustomerResponseDto } from '../../dtos/customer/customer-response.dto';
import type { IUserRepository } from 'src/domain/repositories/user.repository.interface';
export declare class UpdateCustomerUseCase {
    private readonly customerRepository;
    private readonly userRepository;
    constructor(customerRepository: ICustomerRepository, userRepository: IUserRepository);
    execute(id: string, dto: UpdateCustomerDto): Promise<CustomerResponseDto>;
}
