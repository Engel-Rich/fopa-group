import { PaymentMethod } from '../../../domain/entities/payment.entity';
export declare class AddPaymentDto {
    orderId: string;
    amount: number;
    paymentMethod?: PaymentMethod | undefined;
    reference?: string;
}
