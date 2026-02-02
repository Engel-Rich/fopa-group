import { Order } from '../../../domain/entities/order.entity';
import { OrderEntity } from '../../database/entities/order.entity';
import { CustomerMapper } from './customer.mapper';
import { UserMapper } from './user.mapper';
import { OrderItemMapper } from './order-item.mapper';
import { PaymentMapper } from './payment.mapper';

export class OrderMapper {
  static toDomain(entity: OrderEntity): Order {
    const order = new Order(
      entity.orderNumber,
      entity.customerId,
      parseFloat(entity.previousDebt.toString()),
      parseFloat(entity.subtotal.toString()),
      entity.userId,
      parseFloat((entity.amountGiven || 0).toString()),
      parseFloat(entity.amountPaid.toString()),
    );
    order.id = entity.id;
    order.totalAmount = parseFloat(entity.totalAmount.toString());
    order.amountGiven = parseFloat((entity.amountGiven || 0).toString());
    order.amountPaid = parseFloat(entity.amountPaid.toString());
    order.remainingDebt = parseFloat(entity.remainingDebt.toString());
    order.packages = parseInt((entity.packages ?? 0).toString(), 10);
    order.packagesReturned = parseInt((entity.packagesReturned ?? 0).toString(), 10);
    order.remainingPackages = parseInt((entity.remainingPackages ?? 0).toString(), 10);
    order.status = entity.status;
    order.createdAt = entity.createdAt;
    order.updatedAt = entity.updatedAt;
    if (entity.customer) {
      order.customer = CustomerMapper.toDomain(entity.customer);
    }
    if (entity.user) {
      order.user = UserMapper.toDomain(entity.user);
    }
    if (entity.createdBy) {
      order.createdBy = entity.createdBy;
    }
    if (entity.createdByUser) {
      order.createdByUser = UserMapper.toDomain(entity.createdByUser);
    }
    if (entity.items) {
      order.items = entity.items.map((item) => OrderItemMapper.toDomain(item));
    }
    if (entity.payments) {
      order.payments = entity.payments.map((payment) => PaymentMapper.toDomain(payment));
    }
    return order;
  }

  static toEntity(domain: Order): OrderEntity {
    const entity = new OrderEntity();
    if (domain.id) entity.id = domain.id;
    entity.orderNumber = domain.orderNumber;
    entity.customerId = domain.customerId;
    entity.previousDebt = domain.previousDebt;
    entity.subtotal = domain.subtotal;
    entity.totalAmount = domain.totalAmount;
    entity.amountGiven = domain.amountGiven;
    entity.amountPaid = domain.amountPaid;
    entity.remainingDebt = domain.remainingDebt;
    entity.packages = domain.packages;
    entity.packagesReturned = domain.packagesReturned;
    entity.remainingPackages = domain.remainingPackages;
    entity.status = domain.status;
    entity.userId = domain.userId;
    if (domain.createdBy) entity.createdBy = domain.createdBy;
    if (domain.createdAt) entity.createdAt = domain.createdAt;
    if (domain.updatedAt) entity.updatedAt = domain.updatedAt;
    return entity;
  }
}
