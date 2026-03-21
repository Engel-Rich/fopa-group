import { Repository } from 'typeorm';
import type { IPaymentRepository } from 'src/domain/repositories/payment.repository.interface';
import { Payment } from 'src/domain/entities/payment.entity';
import { PaymentEntity } from '../database/entities/payment.entity';
export declare class PaymentRepository implements IPaymentRepository {
    private readonly repository;
    constructor(repository: Repository<PaymentEntity>);
    create(payment: Payment): Promise<Payment>;
    findById(id: string): Promise<Payment | null>;
    findByOrderId(orderId: string): Promise<Payment[]>;
    findAll(): Promise<Payment[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Payment[]>;
    update(id: string, payment: Partial<Payment>): Promise<Payment>;
    delete(id: string): Promise<void>;
}
