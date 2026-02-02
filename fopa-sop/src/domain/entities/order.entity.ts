import { Customer } from './customer.entity';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';
import { Payment } from './payment.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export class Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer?: Customer;
  previousDebt: number;
  subtotal: number;
  totalAmount: number;
  amountGiven: number;
  amountPaid: number;
  remainingDebt: number;
  packages: number;
  packagesReturned: number;
  remainingPackages: number;
  status: OrderStatus;
  userId: string;
  user?: User;
  createdBy?: string;
  createdByUser?: User;
  items?: OrderItem[];
  payments?: Payment[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    orderNumber: string,
    customerId: string,
    previousDebt: number,
    subtotal: number,
    userId: string,
    amountGiven: number,
    amountPaid: number,
    createdBy?: string,
  ) {
    this.orderNumber = orderNumber;
    this.customerId = customerId;
    this.previousDebt = previousDebt;
    this.subtotal = subtotal;
    this.totalAmount = subtotal + previousDebt;
    this.amountGiven = amountGiven;
    this.amountPaid = amountPaid;
    this.remainingDebt = (previousDebt + subtotal) - amountPaid;
    this.packages = 0;
    this.packagesReturned = 0;
    this.remainingPackages = 0;
    this.status = OrderStatus.PENDING;
    this.userId = userId;
    this.createdBy = createdBy;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  addPayment(amount: number): void {
    this.amountPaid += amount;
    this.remainingDebt = this.totalAmount - this.amountPaid;
    this.updateStatus();
    this.updatedAt = new Date();
  }

  addPackagesReturned(count: number): void {
    this.packagesReturned += count;
    this.remainingPackages = Math.max(0, this.packages - this.packagesReturned);
    this.updatedAt = new Date();
  }

  setPackages(count: number): void {
    this.packages = Math.max(0, count);
    this.remainingPackages = Math.max(0, this.packages - this.packagesReturned);
    this.updatedAt = new Date();
  }

  private updateStatus(): void {
    if (this.remainingDebt <= 0) {
      this.status = OrderStatus.PAID;
    } else if (this.amountPaid > 0) {
      this.status = OrderStatus.PARTIALLY_PAID;
    } else {
      this.status = OrderStatus.PENDING;
    }
  }

  cancel(): void {
    this.status = OrderStatus.CANCELLED;
    this.updatedAt = new Date();
  }
}
