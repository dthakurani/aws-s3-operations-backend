import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateBucketObject1706463663480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.createTable(
        new Table({
          name: 'bucket_object',
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
              name: 'bucket_id',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'mime_type',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'size',
              type: 'integer',
              isNullable: false,
            },
            {
              name: 'data',
              type: 'bytea',
              isNullable: false,
            },
            {
              name: 'metadata',
              type: 'json',
              isNullable: true,
            },
            {
              name: 'is_latest_version',
              type: 'boolean',
              isNullable: true,
              default: null,
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

      await queryRunner.createForeignKey(
        'bucket_object',
        new TableForeignKey({
          columnNames: ['bucket_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'bucket',
          onDelete: 'CASCADE',
        }),
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
      await queryRunner.dropTable('bucket_object');

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    }
  }
}
