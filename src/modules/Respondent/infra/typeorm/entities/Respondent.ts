/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Form from '@modules/Form/infra/typeorm/entities/Form';

@Entity('respondents')
class Respondent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  gender: string;

  @Column('varchar')
  schooling: string;

  @Column('timestamp with time zone')
  age: Date;

  @Column('varchar')
  state: string;

  @Column('int', { array: true })
  questionsAnswer: number[];

  @Column('int')
  extraversion: number;

  @Column('int')
  conscientiousness: number;

  @Column('int')
  agreeableness: number;

  @Column('int')
  openness: number;

  @Column('int')
  neuroticism: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  form_id: string;

  @ManyToOne(() => Form)
  @JoinColumn({ name: 'form_id' })
  form: Form;
}

export default Respondent;
