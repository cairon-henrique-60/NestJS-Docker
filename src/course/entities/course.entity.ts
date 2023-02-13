import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { v4 as uuidV4 } from "uuid";

import { Tag } from './tag.entity';

@Entity('courses')
export class course {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  //Join
  @JoinTable()
  //N para N
  @ManyToMany(() => Tag, (tag: Tag) => tag.courses, {
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

      this.id = uuidV4();
  }
}
