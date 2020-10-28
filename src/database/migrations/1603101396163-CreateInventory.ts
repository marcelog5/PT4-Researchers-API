import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateInventory1603101396163
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inventories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'author',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'numberOfQuestions',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'inventoryName',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('inventories');
  }
}
