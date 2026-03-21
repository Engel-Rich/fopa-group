import { User } from './user.entity';
export declare class Customer extends User {
    userId: string;
    address?: string;
    currentDebt: number;
    currentPackagesDebt: number;
    constructor(name: string, password: string, username: string, address?: string, userId?: string, email?: string, phone?: string);
    updateDebt(amount: number): void;
    updatePackagesDebt(count: number): void;
}
