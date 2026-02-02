import { Product } from './product.entity';
import { Order } from './order.entity';

export class OrderItem {
  id: string;
  orderId: string;
  order?: Order;
  productId: string;
  product?: Product;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  createdAt: Date;

  constructor(
    orderId: string,
    productId: string,
    productName: string,
    quantity: number,
    unitPrice: number,
  ) {
    this.orderId = orderId;
    this.productId = productId;
    this.productName = productName;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.subtotal = quantity * unitPrice;
    this.createdAt = new Date();
  }
}
