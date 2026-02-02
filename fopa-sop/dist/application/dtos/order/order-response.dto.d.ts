import { OrderStatus } from '../../../domain/entities/order.entity';
import { CustomerResponseDto } from '../customer/customer-response.dto';
import { OrderItemResponseDto } from './order-item-response.dto';
import { PaymentResponseDto } from './payment-response.dto';
import { UserResponseDto } from '../user/user-response.dto';
export declare class OrderResponseDto {
    id: string;
    orderNumber: string;
    customerId: string;
    customer?: CustomerResponseDto;
    previousDebt: number;
    subtotal: number;
    totalAmount: number;
    amountGiven: number;
    amountPaid: number;
    remainingDebt: number;
    packages: number;
    packagesReturned: number;
    remainingPackages: number;
    status: OrderStatus;
    userId: string;
    createdBy?: UserResponseDto;
    items?: OrderItemResponseDto[];
    payments?: PaymentResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}
