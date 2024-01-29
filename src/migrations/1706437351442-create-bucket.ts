import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBucket1706437351442 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.createTable(
        new Table({
          name: 'bucket',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'versioning',
              type: 'boolean',
              default: false,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
              isNullable: false,
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
              isNullable: false,
            },
            {
              name: 'deleted_at',
              type: 'timestamp',
              isNullable: true,
            },
          ],
        }),
        true,
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.dropTable('bucket');

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    }
  }
}
