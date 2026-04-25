import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PackageTransactionType } from '../../../domain/entities/package-transaction.entity';
import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';

@Entity('package_transactions')
export class PackageTransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  customerId: string;

  @ManyToOne(() => CustomerEntity, { eager: false, nullable: false })
  @JoinColumn({ name: 'customerId' })
  customer: CustomerEntity;

  @Column({ type: 'enum', enum: PackageTransactionType })
  type: PackageTransactionType;

  @Column('int')
  quantity: number;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ nullable: true, type: 'text' })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;
}
