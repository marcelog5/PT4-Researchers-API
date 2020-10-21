import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateForms1603191686746 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'forms',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'term',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'link',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'inventory_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'forms',
      new TableForeignKey({
        name: 'FormsInventory',
        columnNames: ['inventory_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'inventories',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('forms', 'FormsInventory');

    await queryRunner.dropTable('forms');
  }
}
