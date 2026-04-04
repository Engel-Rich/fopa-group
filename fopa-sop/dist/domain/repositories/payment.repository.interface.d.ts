import { Payment } from '../entities/payment.entity';
export interface IPaymentRepository {
    create(payment: Payment): Promise<Payment>;
    findById(id: string): Promise<Payment | null>;
    findByOrderId(orderId: string): Promise<Payment[]>;
    findAll(): Promise<Payment[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Payment[]>;
    update(id: string, payment: Partial<Payment>): Promise<Payment>;
    delete(id: string): Promise<void>;
}
