import { CreateCustomerUseCase } from '../../application/usecases/customer/create-customer.usecase';
import { ListCustomersUseCase } from '../../application/usecases/customer/list-customers.usecase';
import { UpdateCustomerUseCase } from '../../application/usecases/customer/update-customer.usecase';
import { CreateCustomerDto } from '../../application/dtos/customer/create-customer.dto';
import { UpdateCustomerDto } from '../../application/dtos/customer/update-customer.dto';
import { CustomerResponseDto } from '../../application/dtos/customer/customer-response.dto';
export declare class CustomerController {
    private readonly createCustomerUseCase;
    private readonly listCustomersUseCase;
    private readonly updateCustomerUseCase;
    constructor(createCustomerUseCase: CreateCustomerUseCase, listCustomersUseCase: ListCustomersUseCase, updateCustomerUseCase: UpdateCustomerUseCase);
    create(dto: CreateCustomerDto): Promise<CustomerResponseDto>;
    findAll(activeOnly?: string): Promise<CustomerResponseDto[]>;
    update(id: string, dto: UpdateCustomerDto): Promise<CustomerResponseDto>;
}
