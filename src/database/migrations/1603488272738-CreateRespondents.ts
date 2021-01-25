import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRespondents1603488272738
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'respondents',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'gender',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'schooling',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'age',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'questionsAnswer',
            type: 'int',
            isNullable: false,
            isArray: true,
          },
          {
            name: 'extraversion',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'conscientiousness',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'agreeableness',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'openness',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'neuroticism',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'form_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'respondents',
      new TableForeignKey({
        name: 'RespondentsForms',
        columnNames: ['form_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'forms',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('respondents', 'RespondentsForms');

    await queryRunner.dropTable('respondents');
  }
}
