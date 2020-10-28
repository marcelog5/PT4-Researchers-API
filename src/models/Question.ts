/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Inventory from './Inventory';

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

  @Column('int')
  questionNumber: number;

  @Column()
  inventory_id: string;

  @ManyToOne(() => Inventory)
  @JoinColumn({ name: 'inventory_id' })
  inventory: Inventory;
}

export default Question;
