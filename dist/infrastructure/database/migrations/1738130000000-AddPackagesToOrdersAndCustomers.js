"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPackagesToOrdersAndCustomers1738130000000 = void 0;
class AddPackagesToOrdersAndCustomers1738130000000 {
    name = 'AddPackagesToOrdersAndCustomers1738130000000';
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "packages" integer NOT NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "packagesReturned" integer NOT NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "remainingPackages" integer NOT NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE "customers" ADD COLUMN IF NOT EXISTS "currentPackagesDebt" integer NOT NULL DEFAULT 0');
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "orders"
      DROP COLUMN IF EXISTS "packages",
      DROP COLUMN IF EXISTS "packagesReturned",
      DROP COLUMN IF EXISTS "remainingPackages"
    `);
        await queryRunner.query(`
      ALTER TABLE "customers"
      DROP COLUMN IF EXISTS "currentPackagesDebt"
    `);
    }
}
exports.AddPackagesToOrdersAndCustomers1738130000000 = AddPackagesToOrdersAndCustomers1738130000000;
//# sourceMappingURL=1738130000000-AddPackagesToOrdersAndCustomers.js.map