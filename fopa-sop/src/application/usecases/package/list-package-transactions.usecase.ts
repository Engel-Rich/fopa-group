import { Injectable, Inject } from '@nestjs/common';
import type { IPackageTransactionRepository } from '../../../domain/repositories/package-transaction.repository.interface';
import { ListPackageTransactionsQueryDto } from '../../dtos/package/list-package-transactions-query.dto';
import { PackageTransactionListResponseDto } from '../../dtos/package/package-transaction-response.dto';
import { toPackageTransactionResponse } from './package-transaction.presenter';

@Injectable()
export class ListPackageTransactionsUseCase {
  constructor(
    @Inject('IPackageTransactionRepository')
    private readonly packageTransactionRepository: IPackageTransactionRepository,
  ) {}

  async execute(query: ListPackageTransactionsQueryDto): Promise<PackageTransactionListResponseDto> {
    const limit = query.limit ?? 50;
    const offset = query.offset ?? 0;

    let to: Date | undefined;
    if (query.to) {
      to = new Date(query.to);
      // Une date sans heure couvre toute la journée
      if (query.to.length <= 10) to.setHours(23, 59, 59, 999);
    }

    const { data, total } = await this.packageTransactionRepository.findAll({
      type: query.type,
      from: query.from ? new Date(query.from) : undefined,
      to,
      limit,
      offset,
    });

    return {
      data: data.map((t) => toPackageTransactionResponse(t)),
      total,
      limit,
      offset,
    };
  }
}
