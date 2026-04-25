import { Injectable, Inject } from '@nestjs/common';
import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import { NotFoundException } from '../../../shared/exceptions/business.exception';
import { PackagesDebtResponseDto } from '../../dtos/package/package-transaction-response.dto';

@Injectable()
export class GetPackagesDebtUseCase {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(customerId: string): Promise<PackagesDebtResponseDto> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) throw new NotFoundException('Client');

    return {
      customerId: customer.id,
      currentPackagesDebt: customer.currentPackagesDebt ?? 0,
    };
  }
}
