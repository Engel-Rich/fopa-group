import { Injectable, Inject } from '@nestjs/common';
import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import type { IPackageTransactionRepository } from '../../../domain/repositories/package-transaction.repository.interface';
import { PackageTransaction, PackageTransactionType } from '../../../domain/entities/package-transaction.entity';
import { NotFoundException, InvalidOrderException } from '../../../shared/exceptions/business.exception';
import { LendPackagesDto } from '../../dtos/package/lend-packages.dto';
import { PackageTransactionResponseDto } from '../../dtos/package/package-transaction-response.dto';
import { toPackageTransactionResponse } from './package-transaction.presenter';

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

    // Incrément atomique de la dette d'emballages (indépendante de la dette produits)
    const updated = await this.customerRepository.adjustPackagesDebt(dto.customerId, dto.quantity);
    if (!updated) throw new NotFoundException('Client');

    let saved: PackageTransaction;
    try {
      saved = await this.packageTransactionRepository.create(
        new PackageTransaction(
          dto.customerId,
          PackageTransactionType.LEND,
          dto.quantity,
          userId,
          dto.notes,
        ),
      );
    } catch (error) {
      // Compensation : on annule l'incrément si l'opération n'a pas pu être tracée
      await this.customerRepository.adjustPackagesDebt(dto.customerId, -dto.quantity);
      throw error;
    }

    saved.customerName = saved.customerName ?? customer.name;
    return toPackageTransactionResponse(saved, updated.currentPackagesDebt);
  }
}
