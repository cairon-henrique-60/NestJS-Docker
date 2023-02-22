import { 
    BeforeInsert, 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinTable, 
    ManyToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { Course } from "./course.entity";
import { v4 as uuidv4 } from "uuid";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    @Column()
    name: string;
    @Column()
    role: string;
    @JoinTable({ name: 'uses_courses'})
    @ManyToMany(() => Course, (course) => course.name)
    courses: Course[];
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
