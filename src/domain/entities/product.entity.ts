import { Category } from './category.entity';

export class Product {
  id: string;
  name: string;
  categoryId: string;
  category?: Category;
  quantity: number;
  price: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    categoryId: string,
    quantity: number,
    price: number,
    description?: string,
  ) {
    this.name = name;
    this.categoryId = categoryId;
    this.quantity = quantity;
    this.price = price;
    this.description = description;
    this.isActive = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateStock(quantity: number): void {
    this.quantity += quantity;
    if (this.quantity < 0) {
      throw new Error('Stock insuffisant');
    }
    this.updatedAt = new Date();
  }
}
