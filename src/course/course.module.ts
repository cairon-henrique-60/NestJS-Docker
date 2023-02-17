import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Course, Tag])],
    controllers: [CourseController],
    providers: [CourseService],
})
export class CourseModule {}
