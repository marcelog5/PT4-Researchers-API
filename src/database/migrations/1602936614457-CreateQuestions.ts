import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateQuestions1602936614457
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'questions',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'question',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'inverted',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'trait',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'factor',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('questions');
  }
}
