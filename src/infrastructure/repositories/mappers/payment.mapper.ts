import { Payment } from '../../../domain/entities/payment.entity';
import { PaymentEntity } from '../../database/entities/payment.entity';
import { UserMapper } from './user.mapper';

export class PaymentMapper {
  static toDomain(entity: PaymentEntity): Payment {
    const payment = new Payment(
      entity.orderId,
      parseFloat(entity.amount.toString()),
      entity.paymentMethod,
      entity.userId,
      entity.reference,
    );
    payment.id = entity.id;
    payment.createdAt = entity.createdAt;
    if (entity.user) {
      payment.user = UserMapper.toDomain(entity.user);
    }
    return payment;
  }

  static toEntity(domain: Payment): PaymentEntity {
    const entity = new PaymentEntity();
    if (domain.id) entity.id = domain.id;
    entity.orderId = domain.orderId;
    entity.amount = domain.amount;
    entity.paymentMethod = domain.paymentMethod;
    entity.userId = domain.userId;
    entity.reference = domain.reference || '';
    if (domain.createdAt) entity.createdAt = domain.createdAt;
    return entity;
  }
}
