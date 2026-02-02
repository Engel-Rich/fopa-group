import { CategoryResponseDto } from '../category/category-response.dto';
export declare class ProductResponseDto {
    id: string;
    name: string;
    categoryId: string;
    category?: CategoryResponseDto;
    quantity: number;
    price: number;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
