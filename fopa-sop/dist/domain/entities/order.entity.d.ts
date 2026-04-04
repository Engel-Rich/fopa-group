import { Customer } from './customer.entity';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';
import { Payment } from './payment.entity';
export declare enum OrderStatus {
    PENDING = "PENDING",
    PARTIALLY_PAID = "PARTIALLY_PAID",
    PAID = "PAID",
    CANCELLED = "CANCELLED"
}
export declare class Order {
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
    constructor(orderNumber: string, customerId: string, previousDebt: number, subtotal: number, userId: string, amountGiven: number, amountPaid: number, createdBy?: string);
    addPayment(amount: number): void;
    addPackagesReturned(count: number): void;
    setPackages(count: number): void;
    private updateStatus;
    cancel(): void;
}
