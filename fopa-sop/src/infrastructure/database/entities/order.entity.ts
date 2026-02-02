import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OrderStatus } from '../../../domain/entities/order.entity';
import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';
import { OrderItemEntity } from './order-item.entity';
import { PaymentEntity } from './payment.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  orderNumber: string;

  @Column('uuid')
  customerId: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.orders)
  @JoinColumn({ name: 'customerId' })
  customer: CustomerEntity;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  previousDebt: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  amountGiven: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  amountPaid: number;

  @Column('decimal', { precision: 10, scale: 2 })
  remainingDebt: number;

  @Column('int', { default: 0 })
  packages: number;

  @Column('int', { default: 0 })
  packagesReturned: number;

  @Column('int', { default: 0 })
  remainingPackages: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column('uuid', { nullable: true })
  createdBy: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'createdBy' })
  createdByUser: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items: OrderItemEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.order, { cascade: true })
  payments: PaymentEntity[];
}
