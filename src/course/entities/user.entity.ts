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
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;
    @Column()
    name: string;
    @Column()
    role: string;
    @ManyToMany(() => Course, (course) => course.users)
    courses?: Course["name"];
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
