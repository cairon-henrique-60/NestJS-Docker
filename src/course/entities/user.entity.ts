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
@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    @Column()
    name: string;
    @Column()
    role: string;
    @JoinTable({ name: 'users_courses'})
    @ManyToMany(() => Course, (course) => course.name, {
        cascade: true,
    })
    courses?: Course[];
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
