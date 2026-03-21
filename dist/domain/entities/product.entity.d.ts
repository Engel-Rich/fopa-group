import { Category } from './category.entity';
export declare class Product {
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
    constructor(name: string, categoryId: string, quantity: number, price: number, description?: string);
    updateStock(quantity: number): void;
}
