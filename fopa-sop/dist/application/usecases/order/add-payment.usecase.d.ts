import { DataSource } from 'typeorm';
import type { IOrderRepository } from '../../../domain/repositories/order.repository.interface';
import type { IPaymentRepository } from '../../../domain/repositories/payment.repository.interface';
import type { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import { AddPaymentDto } from '../../dtos/order/add-payment.dto';
import { PaymentResponseDto } from '../../dtos/order/payment-response.dto';
export declare class AddPaymentUseCase {
    private readonly orderRepository;
    private readonly paymentRepository;
    private readonly customerRepository;
    private readonly dataSource;
    constructor(orderRepository: IOrderRepository, paymentRepository: IPaymentRepository, customerRepository: ICustomerRepository, dataSource: DataSource);
    execute(dto: AddPaymentDto, userId: string): Promise<PaymentResponseDto>;
    private executePackagesReturn;
}
