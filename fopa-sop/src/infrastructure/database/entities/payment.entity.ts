import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PaymentMethod } from '../../../domain/entities/payment.entity';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  orderId: string;

  @ManyToOne(() => OrderEntity, (order) => order.payments)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @Column({ nullable: true })
  reference: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.payments)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
