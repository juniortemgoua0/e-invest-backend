import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get('')
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':userId')
    getOneUser(@Param('userId') userId: string) {
        return this.userService.getOneUser(userId);
    }

    @Put(':userId')
    updateUser(
        @Param(':userId') userId: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.userService.updateUser(userId, updateUserDto)
    }

    @Delete(':userId')
    deleteUser(@Param('userId') userId: string) {
        return this.userService.deleteUser(userId)
    }
}
