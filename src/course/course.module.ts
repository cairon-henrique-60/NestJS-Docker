import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';
import { User } from './entities/user.entity';
import UsersController from './users/users.controller';
import { UserService } from './users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([Course, Tag, User])],
    controllers: [CourseController, UsersController],
    providers: [CourseService, UserService],
})
export class CourseModule {}
