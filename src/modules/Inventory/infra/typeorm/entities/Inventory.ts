import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Question from '@modules/Question/infra/typeorm/entities/Question';

@Entity('inventories')
class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  author: string;

  @Column('int')
  numberOfQuestions: number;

  @Column('varchar')
  inventoryName: string;

  @OneToMany(() => Question, question => question.inventory, { eager: true })
  questions: Question[];
}

export default Inventory;
