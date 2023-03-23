import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {
    AuthGuard
} from '@nestjs/passport'
import { CreateUserDto } from './create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('username')
    getUserByUsername(@Param('username') username: string) {
        return this.userService.getUserByUsername(username);
    }
    @Post()
    registerUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.registerUser(createUserDto)
    };
}
