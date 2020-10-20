import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('inventories')
class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  author: string;

  @Column('int')
  numberOfQuestions: number;
}

export default Question;
