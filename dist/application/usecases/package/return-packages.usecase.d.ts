import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import type { IPackageTransactionRepository } from '../../../domain/repositories/package-transaction.repository.interface';
import { ReturnPackagesDto } from '../../dtos/package/return-packages.dto';
import { PackageTransactionResponseDto } from '../../dtos/package/package-transaction-response.dto';
export declare class ReturnPackagesUseCase {
    private readonly customerRepository;
    private readonly packageTransactionRepository;
    constructor(customerRepository: ICustomerRepository, packageTransactionRepository: IPackageTransactionRepository);
    execute(dto: ReturnPackagesDto, userId: string): Promise<PackageTransactionResponseDto>;
}
