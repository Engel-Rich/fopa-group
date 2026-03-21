import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { unique: true })
  userId: string;

  @OneToOne(() => UserEntity, { cascade: true, eager: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ nullable: true })
  address?: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  currentDebt: number;

  @Column('int', { default: 0 })
  currentPackagesDebt: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderEntity, (order) => order.customer)
  orders: OrderEntity[];
}
