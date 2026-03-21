import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCustomerProductPrices1760000000000 implements MigrationInterface {
  name = 'AddCustomerProductPrices1760000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "customer_product_prices" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "customerId" uuid NOT NULL,
        "productId" uuid NOT NULL,
        "unitPrice" numeric(10,2) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_customer_product_prices_id" PRIMARY KEY ("id"),
        CONSTRAINT "uq_customer_product_price" UNIQUE ("customerId", "productId"),
        CONSTRAINT "FK_customer_product_prices_customer" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "FK_customer_product_prices_product" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "customer_product_prices"');
  }
}
