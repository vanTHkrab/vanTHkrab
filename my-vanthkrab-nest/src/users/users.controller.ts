import {Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpStatus} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserEntity } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async findAll(): Promise<UserEntity[]> {
        return this.usersService.getUsers({});
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity | null> {
        return this.usersService.getUserById({ id });
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
        return this.usersService.deleteUser({ id });
    }
}
