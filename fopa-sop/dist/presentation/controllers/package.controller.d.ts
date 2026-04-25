import { LendPackagesUseCase } from '../../application/usecases/package/lend-packages.usecase';
import { ReturnPackagesUseCase } from '../../application/usecases/package/return-packages.usecase';
import { GetPackagesDebtUseCase } from '../../application/usecases/package/get-packages-debt.usecase';
import { GetPackagesHistoryUseCase } from '../../application/usecases/package/get-packages-history.usecase';
import { LendPackagesDto } from '../../application/dtos/package/lend-packages.dto';
import { ReturnPackagesDto } from '../../application/dtos/package/return-packages.dto';
import { PackageTransactionResponseDto, PackagesDebtResponseDto } from '../../application/dtos/package/package-transaction-response.dto';
export declare class PackageController {
    private readonly lendPackagesUseCase;
    private readonly returnPackagesUseCase;
    private readonly getPackagesDebtUseCase;
    private readonly getPackagesHistoryUseCase;
    constructor(lendPackagesUseCase: LendPackagesUseCase, returnPackagesUseCase: ReturnPackagesUseCase, getPackagesDebtUseCase: GetPackagesDebtUseCase, getPackagesHistoryUseCase: GetPackagesHistoryUseCase);
    lend(dto: LendPackagesDto, user: any): Promise<PackageTransactionResponseDto>;
    return(dto: ReturnPackagesDto, user: any): Promise<PackageTransactionResponseDto>;
    getDebt(customerId: string): Promise<PackagesDebtResponseDto>;
    getHistory(customerId: string): Promise<PackageTransactionResponseDto[]>;
}
