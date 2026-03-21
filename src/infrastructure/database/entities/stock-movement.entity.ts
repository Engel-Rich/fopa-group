import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StockMovementType } from '../../../domain/entities/stock-movement.entity';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

@Entity('stock_movements')
export class StockMovementEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  productId: string;

  @ManyToOne(() => ProductEntity, (product) => product.stockMovements)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @Column({
    type: 'enum',
    enum: StockMovementType,
  })
  type: StockMovementType;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ nullable: true })
  reason: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.stockMovements)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
