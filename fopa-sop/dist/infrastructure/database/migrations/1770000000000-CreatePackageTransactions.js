"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePackageTransactions1770000000000 = void 0;
class CreatePackageTransactions1770000000000 {
    name = 'CreatePackageTransactions1770000000000';
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TYPE "package_transaction_type_enum" AS ENUM ('LEND', 'RETURN')
    `);
        await queryRunner.query(`
      CREATE TABLE "package_transactions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "customerId" uuid NOT NULL,
        "type" "package_transaction_type_enum" NOT NULL,
        "quantity" integer NOT NULL,
        "userId" uuid NOT NULL,
        "notes" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_package_transactions" PRIMARY KEY ("id"),
        CONSTRAINT "FK_package_transactions_customer"
          FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_package_transactions_user"
          FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "package_transactions"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "package_transaction_type_enum"`);
    }
}
exports.CreatePackageTransactions1770000000000 = CreatePackageTransactions1770000000000;
//# sourceMappingURL=1770000000000-CreatePackageTransactions.js.map