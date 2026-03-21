import { Order } from './order.entity';
import { User } from './user.entity';
export declare enum PaymentMethod {
    CASH = "CASH",
    MOBILE_MONEY = "MOBILE_MONEY",
    BANK_TRANSFER = "BANK_TRANSFER",
    OTHER = "OTHER",
    MANUAL_PACKAGE = "MANUAL_PACKAGE"
}
export declare class Payment {
    id: string;
    orderId: string;
    order?: Order;
    amount: number;
    paymentMethod: PaymentMethod;
    reference?: string;
    userId: string;
    user?: User;
    createdAt: Date;
    constructor(orderId: string, amount: number, paymentMethod: PaymentMethod, userId: string, reference?: string);
}
