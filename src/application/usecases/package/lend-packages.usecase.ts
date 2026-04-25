import { Injectable, Inject } from '@nestjs/common';
import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import type { IPackageTransactionRepository } from '../../../domain/repositories/package-transaction.repository.interface';
import { PackageTransaction, PackageTransactionType } from '../../../domain/entities/package-transaction.entity';
import { NotFoundException, InvalidOrderException } from '../../../shared/exceptions/business.exception';
import { LendPackagesDto } from '../../dtos/package/lend-packages.dto';
import { PackageTransactionResponseDto } from '../../dtos/package/package-transaction-response.dto';

@Injectable()
export class LendPackagesUseCase {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    @Inject('IPackageTransactionRepository')
    private readonly packageTransactionRepository: IPackageTransactionRepository,
  ) {}

  async execute(dto: LendPackagesDto, userId: string): Promise<PackageTransactionResponseDto> {
    const customer = await this.customerRepository.findById(dto.customerId);
    if (!customer) throw new NotFoundException('Client');
    if (!customer.isActive) throw new InvalidOrderException('Le client est désactivé');

    const transaction = new PackageTransaction(
      dto.customerId,
      PackageTransactionType.LEND,
      dto.quantity,
      userId,
      dto.notes,
    );
    const saved = await this.packageTransactionRepository.create(transaction);

    const newDebt = (customer.currentPackagesDebt ?? 0) + dto.quantity;
    await this.customerRepository.updatePackagesDebt(dto.customerId, newDebt);

    return {
      id: saved.id,
      customerId: saved.customerId,
      type: saved.type,
      quantity: saved.quantity,
      userId: saved.userId,
      notes: saved.notes,
      createdAt: saved.createdAt,
    };
  }
}
