import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1700000000000 implements MigrationInterface {
  name = 'InitialMigration1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Cette migration sera générée automatiquement par TypeORM
    // Utilisez: npm run migration:generate -- -n InitialMigration
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback de la migration
  }
}
