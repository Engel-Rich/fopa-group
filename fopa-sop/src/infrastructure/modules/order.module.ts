import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from '../../presentation/controllers/order.controller';
import { CreateOrderUseCase } from '../../application/usecases/order/create-order.usecase';
import { AddPaymentUseCase } from '../../application/usecases/order/add-payment.usecase';
import { GetOrderDetailsUseCase } from '../../application/usecases/order/get-order-details.usecase';
import { ListOrdersUseCase } from '../../application/usecases/order/list-orders.usecase';
import { OrderRepository } from '../repositories/order.repository';
import { OrderItemRepository } from '../repositories/order-item.repository';
import { CustomerRepository } from '../repositories/customer.repository';
import { ProductRepository } from '../repositories/product.repository';
import { StockMovementRepository } from '../repositories/stock-movement.repository';
import { PaymentRepository } from '../repositories/payment.repository';
import { OrderEntity } from '../database/entities/order.entity';
import { OrderItemEntity } from '../database/entities/order-item.entity';
import { CustomerEntity } from '../database/entities/customer.entity';
import { ProductEntity } from '../database/entities/product.entity';
import { StockMovementEntity } from '../database/entities/stock-movement.entity';
import { PaymentEntity } from '../database/entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemEntity,
      CustomerEntity,
      ProductEntity,
      StockMovementEntity,
      PaymentEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [
    CreateOrderUseCase,
    AddPaymentUseCase,
    GetOrderDetailsUseCase,
    ListOrdersUseCase,
    {
      provide: 'IOrderRepository',
      useClass: OrderRepository,
    },
    {
      provide: 'IOrderItemRepository',
      useClass: OrderItemRepository,
    },
    {
      provide: 'ICustomerRepository',
      useClass: CustomerRepository,
    },
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
    {
      provide: 'IStockMovementRepository',
      useClass: StockMovementRepository,
    },
    {
      provide: 'IPaymentRepository',
      useClass: PaymentRepository,
    },
  ],
  exports: ['IOrderRepository', 'IPaymentRepository'],
})
export class OrderModule {}
