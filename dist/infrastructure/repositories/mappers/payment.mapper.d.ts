import { Payment } from '../../../domain/entities/payment.entity';
import { PaymentEntity } from '../../database/entities/payment.entity';
export declare class PaymentMapper {
    static toDomain(entity: PaymentEntity): Payment;
    static toEntity(domain: Payment): PaymentEntity;
}
