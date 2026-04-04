import { ProductEntity } from './product.entity';
export declare class CategoryEntity {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    products: ProductEntity[];
}
