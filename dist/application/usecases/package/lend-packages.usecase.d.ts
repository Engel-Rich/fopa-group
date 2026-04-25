import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import type { IPackageTransactionRepository } from '../../../domain/repositories/package-transaction.repository.interface';
import { LendPackagesDto } from '../../dtos/package/lend-packages.dto';
import { PackageTransactionResponseDto } from '../../dtos/package/package-transaction-response.dto';
export declare class LendPackagesUseCase {
    private readonly customerRepository;
    private readonly packageTransactionRepository;
    constructor(customerRepository: ICustomerRepository, packageTransactionRepository: IPackageTransactionRepository);
    execute(dto: LendPackagesDto, userId: string): Promise<PackageTransactionResponseDto>;
}
