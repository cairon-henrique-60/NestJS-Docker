import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCourseDto } from '../dto/create-course.dto/create-course.dto';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { UserService } from './users.service';

@Controller('users')
export default class UsersController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() createUserDto: CreateUsersDto) {
        return this.userService.createUser(createUserDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
        return this.userService.updateUser(
            id,
            updateUser
        );
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.removeUser(id);
    }
}
