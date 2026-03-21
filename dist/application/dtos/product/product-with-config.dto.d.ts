import { ProductResponseDto } from './product-response.dto';
export declare class ProductWithConfigDto extends ProductResponseDto {
    configuredUnitPrice?: number | null;
    defaultUnitPrice: number;
}
