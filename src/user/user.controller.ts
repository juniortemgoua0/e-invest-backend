import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getAllUsers(
    @Query('status') status: string,
    @Query('pageIndex', ParseIntPipe) pageIndex: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    console.log(status);
    return this.userService.getAllUsers(status, pageIndex, pageSize);
  }

  @Get('usersHaveBet')
  getUserHaveRecentBet() {
    return this.userService.getUserHaveRecentBet();
  }

  @Get(':userId')
  getOneUser(@Param('userId') userId: string) {
    return this.userService.getOneUser(userId);
  }

  @Put(':userId')
  updateUser(
    @Param(':userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log('=============UserId=======================');
    console.log(userId);
    console.log('====================================');
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
