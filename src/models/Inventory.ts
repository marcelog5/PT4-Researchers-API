import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Question from './Question';

@Entity('inventories')
class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  author: string;

  @Column('int')
  numberOfQuestions: number;

  @OneToMany(() => Question, question => question.inventory, { eager: true })
  questions: Question[];
}

export default Inventory;
