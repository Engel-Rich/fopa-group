import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../../../domain/entities/user.entity';
import { OrderEntity } from './order.entity';
import { StockMovementEntity } from './stock-movement.entity';
import { PaymentEntity } from './payment.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({})
  name: string;

  @Column({ unique: true, nullable: true })
  phone?: string;

  @Column()
  password: string;

  @Column({ unique: true, nullable: true })
  username: string = '';

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role?: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @OneToMany(() => StockMovementEntity, (movement) => movement.user)
  stockMovements: StockMovementEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.user)
  payments: PaymentEntity[];
}
