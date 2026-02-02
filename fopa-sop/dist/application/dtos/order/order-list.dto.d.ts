import { OrderResponseDto } from './order-response.dto';
export declare class OrderListDto {
    orders: OrderResponseDto[];
    total: number;
    page: number;
    limit: number;
}
