import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';
import { User } from './entities/user.entity';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    findAll() {
        return this.courseRepository.find({
            relations: ['tags', 'users'],
        });
    };

    findOne(id: string) {
        const course = this.courseRepository.findOne(Number(id), {
            relations: ['tags', 'users'],
        });

        if (!course) {
            throw new NotFoundException(`Course ${id} not found`);
        };
        return course;
    };

    async createCourse(createCourseDto: CreateCourseDto) {

        const tags = await Promise.all(
            createCourseDto.tags.map(name => this.preloadTagByName(name)),
        );

        const users = await Promise.all(
            createCourseDto.user.map(name => this.userRepository.findOne(name)),
        );

        if (!users) {
            throw new NotFoundException(`User ${users} not found`)
        };

        const course = this.courseRepository.create({
            ...createCourseDto,
            tags,
            users,
        });
        return this.courseRepository.save(course);
    }

    async updateCourse(id: string, updateCourseDto: UpdateCourseDto) {
        const tags = updateCourseDto.tags && (
            await Promise.all(
                updateCourseDto.tags.map(name => this.preloadTagByName(name)),
            )
        );
        
        const users = await Promise.all(
            updateCourseDto.user.map(name => this.userRepository.findOne(name)),
        );

        if (!users) {
            throw new NotFoundException(`User ${users} not found`)
        };

        const course = await this.courseRepository.preload({
            id: +id,
            ...updateCourseDto,
            tags,
            users,
        });

        if (!course) {
            throw new NotFoundException(`Course ${id} not found`);
        }

        return this.courseRepository.save(course);

    };

    async removeCourse(id: string) {
        const course = await this.courseRepository.findOne(Number(id));

        if (!course) {
            throw new NotFoundException(`Course ${id} not found`);
        }

        return this.courseRepository.remove(course);
    };

    private async preloadTagByName(name: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne({ name });

        if (tag) {
            return tag;
        }

        return this.tagRepository.create({ name });
    };
}
