import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {BetService} from './bet.service';
import {CreateBetDto} from './dto/create-bet.dto';
import {UpdateBetDto} from './dto/update-bet.dto';
import {Bet} from "./schema/bet.schema";

@Controller('bet')
export class BetController {
  constructor(private readonly betService: BetService) {
  }

  @Post()
  create(@Body() createBetDto: CreateBetDto): Promise<Bet> {
    return this.betService.create(createBetDto);
  }

  @Get()
  findAll(): Promise<Bet[]> {
    return this.betService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.betService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBetDto: UpdateBetDto) {
    return this.betService.update(+id, updateBetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.betService.remove(+id);
  }
}
