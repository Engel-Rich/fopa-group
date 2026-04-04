import { OrderItem } from '../../../domain/entities/order-item.entity';
import { OrderItemEntity } from '../../database/entities/order-item.entity';
import { ProductMapper } from './product.mapper';

export class OrderItemMapper {
  static toDomain(entity: OrderItemEntity): OrderItem {
    const item = new OrderItem(
      entity.orderId,
      entity.productId,
      entity.name,
      entity.quantity,
      parseFloat(entity.unitPrice.toString()),
    );
    item.id = entity.id;
    item.createdAt = entity.createdAt;
    if (entity.product) {
      item.product = ProductMapper.toDomain(entity.product);
    }
    return item;
  }

  static toEntity(domain: OrderItem): OrderItemEntity {
    const entity = new OrderItemEntity();
    if (domain.id) entity.id = domain.id;
    entity.orderId = domain.orderId;
    entity.productId = domain.productId;
    entity.name = domain.name;
    entity.quantity = domain.quantity;
    entity.unitPrice = domain.unitPrice;
    entity.subtotal = domain.subtotal;
    if (domain.createdAt) entity.createdAt = domain.createdAt;
    return entity;
  }
}
