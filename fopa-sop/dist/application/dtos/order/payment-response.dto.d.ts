import { PaymentMethod } from '../../../domain/entities/payment.entity';
export declare class PaymentResponseDto {
    id: string;
    orderId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    reference?: string;
    userId: string;
    createdAt: Date;
}
