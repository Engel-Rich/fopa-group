import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from '../../presentation/controllers/report.controller';
import { GetDailySalesUseCase } from '../../application/usecases/report/get-daily-sales.usecase';
import { GetMonthlySalesUseCase } from '../../application/usecases/report/get-monthly-sales.usecase';
import { GetYearlySalesUseCase } from '../../application/usecases/report/get-yearly-sales.usecase';
import { OrderRepository } from '../repositories/order.repository';
import { OrderEntity } from '../database/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [ReportController],
  providers: [
    GetDailySalesUseCase,
    GetMonthlySalesUseCase,
    GetYearlySalesUseCase,
    {
      provide: 'IOrderRepository',
      useClass: OrderRepository,
    },
  ],
})
export class ReportModule {}
