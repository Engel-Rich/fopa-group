import { Order } from '../../../domain/entities/order.entity';
import { OrderEntity } from '../../database/entities/order.entity';
export declare class OrderMapper {
    static toDomain(entity: OrderEntity): Order;
    static toEntity(domain: Order): OrderEntity;
}
