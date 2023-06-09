import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefreshTokenColumnAdded1685780758051
  implements MigrationInterface
{
  name = 'RefreshTokenColumnAdded1685780758051';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "hashRT" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hashRT"`);
  }
}
