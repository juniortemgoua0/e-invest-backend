import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { BetService } from './bet.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { Bet } from './schema/bet.schema';

@Controller('bet')
export class BetController {
  constructor(private readonly betService: BetService) {}

  @Post(':userId')
  create(
    @Param('userId') userId: string,
    @Body() createBetDto: CreateBetDto,
  ): Promise<Bet> {
    return this.betService.create(userId, createBetDto);
  }

  @Get()
  getBets(
    @Query('pageIndex', ParseIntPipe) pageIndex: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('status') status: string,
  ) {
    return this.betService.getBets(pageIndex, pageSize, status);
  }

  @Get('totalItems')
  getTotalBetItems() {
    return this.betService.getTotalBetItems();
  }

  @Get('check-bet/:userId')
  checkExistingBet(@Param('userId') userId: string) {
    return this.betService.checkExistingBet(userId);
  }

  @Get('allTotal')
  getAllTotalOfBet() {
    return this.betService.getAllTotalOfBet();
  }

  @Get('allTotal/:userId')
  getAllTotalOfBetOfUser(@Param('userId') userId: string) {
    return this.betService.getAllTotalOfBetOfUser(userId);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string): Promise<Bet[]> {
    return this.betService.findAll(userId);
  }

  @Get('current-bet/:userId')
  findCurrentBet(@Param('userId') userId: string): Promise<Bet | null> {
    return this.betService.findCurrentBet(userId);
  }

  @Put(':betId')
  updateBet(@Param('betId') betId: string, @Body() updateBetDto: UpdateBetDto) {
    return this.betService.update(betId, updateBetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return;
  }
}
