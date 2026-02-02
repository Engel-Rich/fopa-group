import { CreateOrderItemDto } from './create-order-item.dto';
export declare class CreateOrderDto {
    customerId: string;
    items: CreateOrderItemDto[];
    amountPaid: number;
    packages?: number;
}
