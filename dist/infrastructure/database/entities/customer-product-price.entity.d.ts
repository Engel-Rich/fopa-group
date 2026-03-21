import { CustomerEntity } from './customer.entity';
import { ProductEntity } from './product.entity';
export declare class CustomerProductPriceEntity {
    id: string;
    customerId: string;
    customer: CustomerEntity;
    productId: string;
    product: ProductEntity;
    unitPrice: number;
    createdAt: Date;
    updatedAt: Date;
}
