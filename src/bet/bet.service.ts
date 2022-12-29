import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetDto } from './dto/update-bet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ModelName } from '../helpers';
import { Model } from 'mongoose';
import { Bet, BetDocument } from './schema/bet.schema';
import { BetStatus } from '../helpers/enums';
import { TotalAmount } from './types/total-amount';
import { GetUsersStatus } from '../helpers/enums/get-users-status.enum';
import { UserDocument } from '../user/user.schema';

@Injectable()
export class BetService {
  constructor(
    @InjectModel(ModelName.BET) private readonly betModel: Model<BetDocument>,
    @InjectModel(ModelName.USER)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(userId: string, createBetDto: CreateBetDto): Promise<Bet> {
    const newBet = new this.betModel({
      ...createBetDto,
      user: userId,
    });

    await this.userModel.findByIdAndUpdate(userId, { $push: { bets: newBet } });

    return (await newBet.save()).populate(['user']);
  }

  async findAll(userId: string) {
    return this.betModel.find({ user: userId }).populate(['user']);
  }

  async findCurrentBet(userId): Promise<Bet | null> {
    const currentBet = await this.betModel
      .findOne({ user: userId })
      .where({ status: BetStatus.IN_PROGRESS })
      .sort('-createdAt');
    if (!currentBet) {
      console.log('currentBet => ', currentBet);
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

  async getTotalBetItems() {
    const allBets: any = await this.betModel.find();
    return allBets.length;
  }

  async getBets(pageIndex: number, pageSize: number, status: string) {
    const skip = pageSize * ((pageIndex || 1) - 1);
    const limit = pageSize || 25;
    const foundCollections = [];

    const collections = await this.betModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    for (const col of collections) {
      foundCollections.push((await col.populate(['user']))['_doc']);
    }

    const totalItems: number = (await this.betModel.find()).length;

    if (status !== undefined)
      switch (status) {
        case GetUsersStatus.ALL:
          return {
            data: foundCollections,
            pagination: {
              index: pageIndex,
              size: foundCollections.length,
              total: totalItems,
            },
          };
        case GetUsersStatus.IN_LINE:
          let users = [];
          users = await this.betModel
            .find()
            .where('status')
            .equals(BetStatus.IN_PROGRESS);
          return users;
        default:
          return this.betModel.find();
      }
    else {
      return this.betModel.find();
    }
  }

  async getAllTotalOfBet(): Promise<TotalAmount> {
    const allBets: any = await this.betModel.find();

    const total: TotalAmount = {
      available: 0,
      retained: 0,
      balance: 0,
      bet: 0,
      lastBetAmount: 0,
    };

    for (const bet of allBets) {
      total.available += bet?.available_amount;
      total.retained += bet?.retained_amount;
      total.balance += bet?.balance_amount;
      total.bet += bet?.bet_amount;
    }
    total.lastBetAmount = allBets[allBets.length - 1].bet_amount;

    return total;
  }

  async getAllTotalOfBetOfUser(userId: string) {
    const allBets: any = await this.betModel.find({ user: userId });

    const total: TotalAmount = {
      available: 0,
      retained: 0,
      balance: 0,
      bet: 0,
    };

    for (const bet of allBets) {
      total.available += bet?.available_amount;
      total.retained += bet?.retained_amount;
      total.balance += bet?.balance_amount;
      total.bet += bet?.bet_amount;
    }
    total.gains = total.available - total.bet;
    return total;
  }
}
