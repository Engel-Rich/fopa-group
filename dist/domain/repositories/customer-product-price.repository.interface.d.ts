export interface ICustomerProductPriceRepository {
    findByCustomerId(customerId: string): Promise<Array<{
        productId: string;
        price: number;
    }>>;
    findOne(customerId: string, productId: string): Promise<{
        productId: string;
        price: number;
    } | null>;
    upsert(customerId: string, productId: string, price: number): Promise<void>;
}
