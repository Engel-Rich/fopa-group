import { ProductResponseDto } from './product-response.dto';
export declare class ProductListDto {
    products: ProductResponseDto[];
    total: number;
    page: number;
    limit: number;
}
