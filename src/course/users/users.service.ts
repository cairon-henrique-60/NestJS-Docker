import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { Course } from "../entities/course.entity";
import { User } from "../entities/user.entity";
import { CreateUsersDto } from "./dto/create-users.dto";
import { UpdateUserDto } from "./dto/update-users.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Course)
    private readonly shearchCourse: Repository<Course>,
  ) { };

  findAll() {
    return this.userRepository.find({
      relations: ['courses'],
    });
  };

  findOne(id: string) {
    const user = this.userRepository.findOne(Number(id), {
      relations: ['courses'],
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    };

    return user;
  };

  async createUser(createUserDto: CreateUsersDto) {
    const courses = createUserDto.courses && (
      await Promise.all(
        createUserDto.courses.map(name => this.shearchCourse.findOne({ name }))
      )
    );

    if (!courses) {
      throw new NotFoundException(`Course ${createUserDto.courses} not found`)
    };

    const newUser = this.userRepository.create({
      ...createUserDto,
      ...courses,
    });

    return this.userRepository.save(newUser);
  };

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const courses = updateUserDto.courses && (
      await Promise.all(
        updateUserDto.courses.map(name => this.shearchCourse.findOne({ name })),
      )
    );

    if (!courses) {
      throw new NotFoundException(`Course ${updateUserDto.courses} not found`);
    };

    const teste = courses.forEach(course => {
      course.name
    });

    const nameCourse = {
      name: String(teste),
    }
    const user = {
      id: +id,
      ...updateUserDto,
      ...courses,
    };

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    };

    return this.userRepository.save(user);
  };

  async removeUser(id: string) {
    const user = await this.userRepository.findOne(Number(id));

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    };

    return this.userRepository.remove(user)
  }
}