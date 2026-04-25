import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import { PackagesDebtResponseDto } from '../../dtos/package/package-transaction-response.dto';
export declare class GetPackagesDebtUseCase {
    private readonly customerRepository;
    constructor(customerRepository: ICustomerRepository);
    execute(customerId: string): Promise<PackagesDebtResponseDto>;
}
