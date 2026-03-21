import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import type { IOrderRepository } from '../../../domain/repositories/order.repository.interface';
import { DailySalesDto } from '../../dtos/report/daily-sales.dto';
import { DailySalesListDto } from '../../dtos/report/daily-sales-list.dto';

@Injectable()
export class GetDailySalesUseCase {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(page: number = 1, limit: number = 10): Promise<DailySalesListDto> {
    if (page < 1) {
      throw new BadRequestException('Le numéro de page doit être supérieur ou égal à 1');
    }

    if (limit < 1 || limit > 100) {
      throw new BadRequestException('La limite doit être entre 1 et 100');
    }

    const result = await this.orderRepository.findDailySalesGroupedByDate(page, limit);

    const dailySales: DailySalesDto[] = result.data.map((item) => ({
      date: item.date,
      totalSales: item.totalSales,
      totalOrders: item.totalOrders,
      totalAmountPaid: item.totalAmountPaid,
      totalDebt: item.totalDebt,
    }));

    return {
      dailySales,
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }
}
