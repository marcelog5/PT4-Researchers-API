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

import Inventory from './Inventory';

@Entity('forms')
class Form {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  term: string;

  @Column('varchar')
  link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  inventory_id: string;

  @ManyToOne(() => Inventory, { eager: true })
  @JoinColumn({ name: 'inventory_id' })
  inventory: Inventory;
}

export default Form;
