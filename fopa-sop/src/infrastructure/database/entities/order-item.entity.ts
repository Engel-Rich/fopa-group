import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  orderId: string;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @Column('uuid')
  productId: string;

  @ManyToOne(() => ProductEntity, (product) => product.orderItems)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @Column()
  productName: string;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @CreateDateColumn()
  createdAt: Date;
}
