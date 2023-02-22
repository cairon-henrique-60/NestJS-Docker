import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCourseDto } from '../dto/create-course.dto/create-course.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { UserService } from './users.service';

@Controller('users')
export default class UsersController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll() {
        return this.userService.findAll({ relations: ['courses'] });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(
            Number(id),
            { relations: ['courses'] }
        );
    }

    @Post()
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.userService.create(createCourseDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
        return this.userService.update(
            Number(id),
            updateUser
        );
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.deleteProps(Number(id));
    }
}
