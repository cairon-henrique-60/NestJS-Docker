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
import { User } from "./user.entity";

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @JoinTable({ name: 'courses_tags'})
  @ManyToMany(() => Tag, (tag) => tag.courses, {
    cascade: true,
  })
  tags: Tag[];
  @JoinTable({ name: 'users_courses'})
  @ManyToMany(() => User, (user) => user.courses)
  users: User["name"];
  @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
