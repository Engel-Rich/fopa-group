import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import { CustomerResponseDto } from '../../dtos/customer/customer-response.dto';
export declare class ListCustomersUseCase {
    private readonly customerRepository;
    constructor(customerRepository: ICustomerRepository);
    execute(activeOnly?: boolean): Promise<CustomerResponseDto[]>;
}
