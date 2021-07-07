import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateForeignKey1603190530027
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'questions',
      new TableForeignKey({
        name: 'QuestionInventory',
        columnNames: ['inventory_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'inventories',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('questions', 'QuestionInventory');
  }
}
