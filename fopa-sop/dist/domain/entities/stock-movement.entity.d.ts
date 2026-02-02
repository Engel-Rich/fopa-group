import { Product } from './product.entity';
import { User } from './user.entity';
export declare enum StockMovementType {
    ENTREE = "ENTREE",
    SORTIE = "SORTIE",
    VENTE = "VENTE"
}
export declare class StockMovement {
    id: string;
    productId: string;
    product?: Product;
    type: StockMovementType;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    reason?: string;
    userId: string;
    user?: User;
    createdAt: Date;
    constructor(productId: string, type: StockMovementType, quantity: number, unitPrice: number, reason?: string, userId?: string);
}
