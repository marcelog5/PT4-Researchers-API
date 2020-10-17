import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questions')
class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  question: string;

  @Column('boolean')
  inverted: boolean;

  @Column('varchar')
  trait: string;

  @Column('varchar')
  factor: string;
}

export default Question;
