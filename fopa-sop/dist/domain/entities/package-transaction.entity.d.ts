export declare enum PackageTransactionType {
    LEND = "LEND",
    RETURN = "RETURN"
}
export declare class PackageTransaction {
    id: string;
    customerId: string;
    type: PackageTransactionType;
    quantity: number;
    userId: string;
    notes?: string;
    createdAt: Date;
    constructor(customerId: string, type: PackageTransactionType, quantity: number, userId: string, notes?: string);
}
