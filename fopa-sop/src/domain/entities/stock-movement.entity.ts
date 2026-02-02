import { Product } from './product.entity';
import { User } from './user.entity';

export enum StockMovementType {
  ENTREE = 'ENTREE',
  SORTIE = 'SORTIE',
  VENTE = 'VENTE',
}

export class StockMovement {
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

  constructor(
    productId: string,
    type: StockMovementType,
    quantity: number,
    unitPrice: number,
    reason?: string,
    userId?: string,
  ) {
    this.productId = productId;
    this.type = type;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.totalAmount = quantity * unitPrice;
    this.reason = reason;
    if (userId) {
      this.userId = userId;
    }
    this.createdAt = new Date();
  }
}
