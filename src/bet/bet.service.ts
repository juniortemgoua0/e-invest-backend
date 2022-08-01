import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ModelName } from '../helpers';
import { Model } from 'mongoose';
import { Bet, BetDocument } from './schema/bet.schema';
import { BetStatus } from '../helpers/enums';

@Injectable()
export class BetService {
  constructor(
    @InjectModel(ModelName.BET) private readonly betModel: Model<BetDocument>,
  ) {}

  async create(userId: string, createBetDto: CreateBetDto): Promise<Bet> {
    const newBet = new this.betModel({
      ...createBetDto,
      user: userId,
    });
    return (await newBet.save()).populate(['user']);
  }

  async findAll(userId: string) {
    return this.betModel.find({ user: userId }).populate(['user']);
  }

  async findCurrentBet(userId): Promise<Bet | null> {
    const currentBet = await this.betModel
      .findOne({ user: userId })
      .where({ status: BetStatus.IN_PROGRESS });
    if (!currentBet) {
      console.log(currentBet);
      throw new HttpException(
        "Vous n'avez pas de mise en cours",
        HttpStatus.UNAUTHORIZED,
      );
    }
    return currentBet;
  }

  update(userId: string, updateBetDto: UpdateBetDto) {
    return this.betModel.findByIdAndUpdate(
      userId,
      { $set: { ...updateBetDto } },
      { new: true, upsert: true },
    );
  }

  async checkExistingBet(userId: string) {
    const verifyExistingBet = await this.betModel
      .findOne({ user: userId })
      .where({ status: BetStatus.IN_PROGRESS });
    console.log(verifyExistingBet);
    if (verifyExistingBet) {
      throw new HttpException(
        'Il existe deja une mise en cours',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return {
      msg: 'done',
      status: 200,
    };
  }
}
