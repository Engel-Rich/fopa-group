import { Injectable, Inject } from '@nestjs/common';
import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import type { IPackageTransactionRepository } from '../../../domain/repositories/package-transaction.repository.interface';
import { PackagesDebtsSummaryResponseDto } from '../../dtos/package/package-transaction-response.dto';

@Injectable()
export class ListPackagesDebtsUseCase {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    @Inject('IPackageTransactionRepository')
    private readonly packageTransactionRepository: IPackageTransactionRepository,
  ) {}

  async execute(): Promise<PackagesDebtsSummaryResponseDto> {
    const [debtors, totals] = await Promise.all([
      this.customerRepository.findWithPackagesDebt(),
      this.packageTransactionRepository.getTotals(),
    ]);

    const customers = debtors.map((c) => ({
      customerId: c.id,
      name: c.name,
      phone: c.phone,
      address: c.address,
      currentPackagesDebt: c.currentPackagesDebt ?? 0,
    }));

    return {
      totalPackagesDebt: customers.reduce((sum, c) => sum + c.currentPackagesDebt, 0),
      debtorsCount: customers.length,
      totalLent: totals.totalLent,
      totalReturned: totals.totalReturned,
      customers,
    };
  }
}
