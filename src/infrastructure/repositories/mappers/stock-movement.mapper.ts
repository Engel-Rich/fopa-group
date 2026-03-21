import { StockMovement } from '../../../domain/entities/stock-movement.entity';
import { StockMovementEntity } from '../../database/entities/stock-movement.entity';
import { ProductMapper } from './product.mapper';
import { UserMapper } from './user.mapper';

export class StockMovementMapper {
  static toDomain(entity: StockMovementEntity): StockMovement {
    const movement = new StockMovement(
      entity.productId,
      entity.type,
      entity.quantity,
      parseFloat(entity.unitPrice.toString()),
      entity.reason,
      entity.userId,
    );
    movement.id = entity.id;
    movement.createdAt = entity.createdAt;
    if (entity.product) {
      movement.product = ProductMapper.toDomain(entity.product);
    }
    if (entity.user) {
      movement.user = UserMapper.toDomain(entity.user);
    }
    return movement;
  }

  static toEntity(domain: StockMovement): StockMovementEntity {
    const entity = new StockMovementEntity();
    if (domain.id) entity.id = domain.id;
    entity.productId = domain.productId;
    entity.type = domain.type;
    entity.quantity = domain.quantity;
    entity.unitPrice = domain.unitPrice;
    entity.totalAmount = domain.totalAmount;
    entity.reason = domain.reason || '';
    entity.userId = domain.userId;
    if (domain.createdAt) entity.createdAt = domain.createdAt;
    return entity;
  }
}
