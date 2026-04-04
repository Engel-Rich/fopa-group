import { OrderItem } from '../../../domain/entities/order-item.entity';
import { OrderItemEntity } from '../../database/entities/order-item.entity';
export declare class OrderItemMapper {
    static toDomain(entity: OrderItemEntity): OrderItem;
    static toEntity(domain: OrderItem): OrderItemEntity;
}
