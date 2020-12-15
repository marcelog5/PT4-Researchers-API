/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Form from './Form';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  gender: string;

  @Column('timestamp with time zone')
  age: Date;

  @Column('varchar')
  institution: string;

  @Column('varchar')
  orcid: string;

  @Column('varchar')
  lattes: string;

  @Column('varchar')
  state: string;

  @Column('varchar')
  schooling: string;

  @Column('boolean')
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Form, form => form.user)
  forms: Form[];
}

export default User;
