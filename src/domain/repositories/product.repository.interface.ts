import { Product } from '../entities/product.entity';

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findByCategoryId(categoryId: string): Promise<Product[]>;
  findActiveProducts(): Promise<Product[]>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  delete(id: string): Promise<void>;
  updateStock(id: string, quantity: number): Promise<Product>;
}
