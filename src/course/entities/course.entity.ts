import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { Tag } from './tag.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;
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
}
