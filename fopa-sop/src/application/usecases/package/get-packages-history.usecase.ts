import { Injectable, Inject } from '@nestjs/common';
import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import type { IPackageTransactionRepository } from '../../../domain/repositories/package-transaction.repository.interface';
import { NotFoundException } from '../../../shared/exceptions/business.exception';
import { PackageTransactionResponseDto } from '../../dtos/package/package-transaction-response.dto';
import { toPackageTransactionResponse } from './package-transaction.presenter';

@Injectable()
export class GetPackagesHistoryUseCase {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    @Inject('IPackageTransactionRepository')
    private readonly packageTransactionRepository: IPackageTransactionRepository,
  ) {}

  async execute(customerId: string): Promise<PackageTransactionResponseDto[]> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) throw new NotFoundException('Client');

    const transactions = await this.packageTransactionRepository.findByCustomerId(customerId);
    return transactions.map((t) => toPackageTransactionResponse(t));
  }
}
