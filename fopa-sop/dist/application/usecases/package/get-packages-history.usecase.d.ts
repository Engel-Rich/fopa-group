import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import type { IPackageTransactionRepository } from '../../../domain/repositories/package-transaction.repository.interface';
import { PackageTransactionResponseDto } from '../../dtos/package/package-transaction-response.dto';
export declare class GetPackagesHistoryUseCase {
    private readonly customerRepository;
    private readonly packageTransactionRepository;
    constructor(customerRepository: ICustomerRepository, packageTransactionRepository: IPackageTransactionRepository);
    execute(customerId: string): Promise<PackageTransactionResponseDto[]>;
}
