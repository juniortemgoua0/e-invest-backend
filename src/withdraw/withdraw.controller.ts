import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { WithdrawService } from './withdraw.service';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';

@Controller('withdraw')
export class WithdrawController {
  constructor(private readonly withdrawService: WithdrawService) {}

  @Put('validate/:userId')
  validateWithdraw(@Param('userId') userId: string) {
    return this.withdrawService.validateWithdraw(userId);
  }

  @Post('')
  createWithdraw(@Body() createWithdrawDto: CreateWithdrawDto) {
    return this.withdrawService.createWithdraw(createWithdrawDto);
  }

  @Get()
  getWithdraw(
    @Query('pageIndex', ParseIntPipe) pageIndex: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('status') status: string,
  ) {
    return this.withdrawService.getWithdraw(pageIndex, pageSize, status);
  }

  @Get(':userId')
  getUserWithdraw(
    @Query('pageIndex', ParseIntPipe) pageIndex: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('status') status: string,
    @Param('userId') userId: string,
  ) {
    console.log(pageIndex, pageSize);
    return this.withdrawService.getUserWithdraw(pageIndex, pageSize, userId);
  }
}
