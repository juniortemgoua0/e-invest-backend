import {Injectable} from '@nestjs/common';
import {CreateBetDto} from './dto/create-bet.dto';
import {UpdateBetDto} from './dto/update-bet.dto';
import {InjectModel} from "@nestjs/mongoose";
import {ModelName} from "../helpers";
import {Model} from "mongoose";
import {Bet, BetDocument} from "./schema/bet.schema";

@Injectable()
export class BetService {

  constructor(@InjectModel(ModelName.BET) private readonly betModel: Model<BetDocument>) {
  }

  async create(createBetDto: CreateBetDto): Promise<Bet> {
    const {user_id, ...remain} = createBetDto
    const newBet = new this.betModel({
      ...remain,
      user: user_id
    })
    return (await newBet.save()).populate(['user'])
  }

  async findAll(){
    return this.betModel.find().populate(['user'])
  }

  findOne(id: number) {
    return `This action returns a #${id} bet`;
  }

  update(id: number, updateBetDto: UpdateBetDto) {
    return `This action updates a #${id} bet`;
  }

  remove(id: number) {
    return `This action removes a #${id} bet`;
  }
}
