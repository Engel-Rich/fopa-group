import { Injectable, Inject } from '@nestjs/common';
import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import type { IPackageTransactionRepository } from '../../../domain/repositories/package-transaction.repository.interface';
import { PackageTransaction, PackageTransactionType } from '../../../domain/entities/package-transaction.entity';
import { NotFoundException, InvalidOrderException } from '../../../shared/exceptions/business.exception';
import { ReturnPackagesDto } from '../../dtos/package/return-packages.dto';
import { PackageTransactionResponseDto } from '../../dtos/package/package-transaction-response.dto';

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

    const transaction = new PackageTransaction(
      dto.customerId,
      PackageTransactionType.RETURN,
      dto.quantity,
      userId,
      dto.notes,
    );
    const saved = await this.packageTransactionRepository.create(transaction);

    const newDebt = currentDebt - dto.quantity;
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
