import { CreateOrderUseCase } from '../../application/usecases/order/create-order.usecase';
import { AddPaymentUseCase } from '../../application/usecases/order/add-payment.usecase';
import { GetOrderDetailsUseCase } from '../../application/usecases/order/get-order-details.usecase';
import { ListOrdersUseCase } from '../../application/usecases/order/list-orders.usecase';
import { CreateOrderDto } from '../../application/dtos/order/create-order.dto';
import { AddPaymentDto } from '../../application/dtos/order/add-payment.dto';
import { OrderResponseDto } from '../../application/dtos/order/order-response.dto';
import { OrderListDto } from '../../application/dtos/order/order-list.dto';
import { PaymentResponseDto } from '../../application/dtos/order/payment-response.dto';
import { OrderStatus } from '../../domain/entities/order.entity';
export declare class OrderController {
    private readonly createOrderUseCase;
    private readonly addPaymentUseCase;
    private readonly getOrderDetailsUseCase;
    private readonly listOrdersUseCase;
    constructor(createOrderUseCase: CreateOrderUseCase, addPaymentUseCase: AddPaymentUseCase, getOrderDetailsUseCase: GetOrderDetailsUseCase, listOrdersUseCase: ListOrdersUseCase);
    findAll(page?: string, limit?: string, customerId?: string, status?: OrderStatus): Promise<OrderListDto>;
    create(dto: CreateOrderDto, user: any): Promise<OrderResponseDto>;
    findOne(id: string): Promise<OrderResponseDto>;
    addPayment(dto: AddPaymentDto, user: any): Promise<PaymentResponseDto>;
}
