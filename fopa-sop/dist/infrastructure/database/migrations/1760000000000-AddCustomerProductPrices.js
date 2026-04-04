"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCustomerProductPrices1760000000000 = void 0;
class AddCustomerProductPrices1760000000000 {
    name = 'AddCustomerProductPrices1760000000000';
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE IF EXISTS "customer_product_prices"');
    }
}
exports.AddCustomerProductPrices1760000000000 = AddCustomerProductPrices1760000000000;
//# sourceMappingURL=1760000000000-AddCustomerProductPrices.js.map