import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockController } from '../../presentation/controllers/stock.controller';
import { CreateStockEntryUseCase } from '../../application/usecases/stock/create-stock-entry.usecase';
import { CreateStockExitUseCase } from '../../application/usecases/stock/create-stock-exit.usecase';
import { ListStockMovementsUseCase } from '../../application/usecases/stock/list-stock-movements.usecase';
import { StockMovementRepository } from '../repositories/stock-movement.repository';
import { ProductRepository } from '../repositories/product.repository';
import { StockMovementEntity } from '../database/entities/stock-movement.entity';
import { ProductEntity } from '../database/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockMovementEntity, ProductEntity])],
  controllers: [StockController],
  providers: [
    CreateStockEntryUseCase,
    CreateStockExitUseCase,
    ListStockMovementsUseCase,
    {
      provide: 'IStockMovementRepository',
      useClass: StockMovementRepository,
    },
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
  ],
  exports: ['IStockMovementRepository', CreateStockEntryUseCase],
})
export class StockModule { }
