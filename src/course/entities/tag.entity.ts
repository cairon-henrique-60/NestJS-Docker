import {
BeforeInsert,
Column,
CreateDateColumn,
Entity,
ManyToMany,
PrimaryGeneratedColumn
} from "typeorm";
import { course } from "./course.entity";

import { v4 as uuidv4 } from "uuid";

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    //Relação N p N
    @ManyToMany(() => course, (course: course) => course.tags)
    courses: course[];

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
