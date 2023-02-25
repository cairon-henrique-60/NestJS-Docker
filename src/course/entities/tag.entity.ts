import {
BeforeInsert,
Column,
CreateDateColumn,
Entity,
ManyToMany,
PrimaryGeneratedColumn
} from "typeorm";
import { Course } from "./course.entity";

import { v4 as uuidv4 } from "uuid";

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;
    @Column()
    name: string;
    //Relação N p N
    @ManyToMany(() => Course, (course) => course.tags)
    courses: Course[];
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
