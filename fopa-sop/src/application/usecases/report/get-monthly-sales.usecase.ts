import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import type { IOrderRepository } from '../../../domain/repositories/order.repository.interface';
import { MonthlySalesDto } from '../../dtos/report/monthly-sales.dto';

@Injectable()
export class GetMonthlySalesUseCase {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(month: number, year: number): Promise<MonthlySalesDto> {
    if (!month || isNaN(month) || month < 1 || month > 12) {
      throw new BadRequestException('Mois invalide. Le mois doit être entre 1 et 12');
    }

    if (!year || isNaN(year) || year < 1900 || year > 2100) {
      throw new BadRequestException('Année invalide');
    }

    const startDate = new Date(year, month - 1, 1);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(year, month, 0);
    endDate.setHours(23, 59, 59, 999);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new BadRequestException('Impossible de créer les dates avec les paramètres fournis');
    }

    const orders = await this.orderRepository.findByDateRange(startDate, endDate);

    const totalSales = orders.reduce((sum, order) => sum + order.subtotal, 0);
    const totalOrders = orders.length;
    const totalAmountPaid = orders.reduce((sum, order) => sum + order.amountPaid, 0);
    const totalDebt = orders.reduce((sum, order) => sum + order.remainingDebt, 0);

    return {
      month,
      year,
      totalSales,
      totalOrders,
      totalAmountPaid,
      totalDebt,
    };
  }
}
