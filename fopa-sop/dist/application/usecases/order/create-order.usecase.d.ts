import { DataSource } from 'typeorm';
import type { IOrderRepository } from '../../../domain/repositories/order.repository.interface';
import type { IOrderItemRepository } from '../../../domain/repositories/order-item.repository.interface';
import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import type { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import type { IStockMovementRepository } from '../../../domain/repositories/stock-movement.repository.interface';
import type { IPaymentRepository } from '../../../domain/repositories/payment.repository.interface';
import { CreateOrderDto } from '../../dtos/order/create-order.dto';
import { OrderResponseDto } from '../../dtos/order/order-response.dto';
export declare class CreateOrderUseCase {
    private readonly orderRepository;
    private readonly orderItemRepository;
    private readonly customerRepository;
    private readonly productRepository;
    private readonly stockMovementRepository;
    private readonly paymentRepository;
    private readonly dataSource;
    constructor(orderRepository: IOrderRepository, orderItemRepository: IOrderItemRepository, customerRepository: ICustomerRepository, productRepository: IProductRepository, stockMovementRepository: IStockMovementRepository, paymentRepository: IPaymentRepository, dataSource: DataSource);
    execute(dto: CreateOrderDto, userId: string): Promise<OrderResponseDto>;
}
