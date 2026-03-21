export interface ICustomerProductPriceRepository {
  findByCustomerId(customerId: string): Promise<Array<{ productId: string; unitPrice: number }>>;
  findOne(customerId: string, productId: string): Promise<{ productId: string; unitPrice: number } | null>;
  upsert(customerId: string, productId: string, unitPrice: number): Promise<void>;
}
