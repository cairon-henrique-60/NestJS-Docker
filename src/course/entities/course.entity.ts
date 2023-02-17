import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { v4 as uuidv4 } from 'uuid';

import { Tag } from './tag.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  //Join
  @JoinTable({ name: 'courses_tags'})
  //N para N
  @ManyToMany(() => Tag, (tag) => tag.courses, {
    cascade: true,
  })
  tags: Tag[];

  @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

  @BeforeInsert()
  generateId() {
      if (this.id) {
          return;
      }

      this.id = uuidv4();
  }
}
