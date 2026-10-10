import { Injectable, Inject } from '@nestjs/common';
import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import type { IPackageTransactionRepository } from '../../../domain/repositories/package-transaction.repository.interface';
import { PackageTransaction, PackageTransactionType } from '../../../domain/entities/package-transaction.entity';
import { NotFoundException, InvalidOrderException } from '../../../shared/exceptions/business.exception';
import { ReturnPackagesDto } from '../../dtos/package/return-packages.dto';
import { PackageTransactionResponseDto } from '../../dtos/package/package-transaction-response.dto';
import { toPackageTransactionResponse } from './package-transaction.presenter';

@Injectable()
export class ReturnPackagesUseCase {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    @Inject('IPackageTransactionRepository')
    private readonly packageTransactionRepository: IPackageTransactionRepository,
  ) {}

  async execute(dto: ReturnPackagesDto, userId: string): Promise<PackageTransactionResponseDto> {
    const customer = await this.customerRepository.findById(dto.customerId);
    if (!customer) throw new NotFoundException('Client');

    const currentDebt = customer.currentPackagesDebt ?? 0;
    if (currentDebt <= 0) {
      throw new InvalidOrderException("Ce client n'a aucune dette d'emballage");
    }
    if (dto.quantity > currentDebt) {
      throw new InvalidOrderException(
        `Le nombre d'emballages remboursés (${dto.quantity}) dépasse la dette actuelle (${currentDebt})`,
      );
    }

    // Décrément atomique et conditionnel : la dette ne peut jamais devenir négative,
    // même si deux remboursements sont saisis simultanément.
    const updated = await this.customerRepository.adjustPackagesDebt(dto.customerId, -dto.quantity);
    if (!updated) {
      throw new InvalidOrderException(
        "La dette d'emballages a changé entre-temps, veuillez actualiser et réessayer",
      );
    }

    let saved: PackageTransaction;
    try {
      saved = await this.packageTransactionRepository.create(
        new PackageTransaction(
          dto.customerId,
          PackageTransactionType.RETURN,
          dto.quantity,
          userId,
          dto.notes,
        ),
      );
    } catch (error) {
      await this.customerRepository.adjustPackagesDebt(dto.customerId, dto.quantity);
      throw error;
    }

    saved.customerName = saved.customerName ?? customer.name;
    return toPackageTransactionResponse(saved, updated.currentPackagesDebt);
  }
}
