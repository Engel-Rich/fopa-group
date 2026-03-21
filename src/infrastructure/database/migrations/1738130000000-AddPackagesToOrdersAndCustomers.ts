import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPackagesToOrdersAndCustomers1738130000000 implements MigrationInterface {
  name = 'AddPackagesToOrdersAndCustomers1738130000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "packages" integer NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "packagesReturned" integer NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "remainingPackages" integer NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE "customers" ADD COLUMN IF NOT EXISTS "currentPackagesDebt" integer NOT NULL DEFAULT 0');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
