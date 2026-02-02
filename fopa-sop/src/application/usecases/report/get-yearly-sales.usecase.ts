import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import type { IOrderRepository } from '../../../domain/repositories/order.repository.interface';
import { YearlySalesDto } from '../../dtos/report/yearly-sales.dto';

@Injectable()
export class GetYearlySalesUseCase {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(year: number): Promise<YearlySalesDto> {
    if (!year || isNaN(year) || year < 1900 || year > 2100) {
      throw new BadRequestException('Année invalide');
    }

    const startDate = new Date(year, 0, 1);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(year, 11, 31);
    endDate.setHours(23, 59, 59, 999);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new BadRequestException('Impossible de créer les dates avec l\'année fournie');
    }

    const orders = await this.orderRepository.findByDateRange(startDate, endDate);

    const totalSales = orders.reduce((sum, order) => sum + order.subtotal, 0);
    const totalOrders = orders.length;
    const totalAmountPaid = orders.reduce((sum, order) => sum + order.amountPaid, 0);
    const totalDebt = orders.reduce((sum, order) => sum + order.remainingDebt, 0);

    return {
      year,
      totalSales,
      totalOrders,
      totalAmountPaid,
      totalDebt,
    };
  }
}
