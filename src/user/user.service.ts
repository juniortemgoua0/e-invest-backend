import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { UpdateUserDto } from './dto';
import { ModelName } from '../helpers';
import { GetUsersStatus } from '../helpers/enums/get-users-status.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(ModelName.USER)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getAllUsers(status: string, pageIndex: number, pageSize: number) {
    const skip = pageSize * ((pageIndex || 1) - 1);
    const limit = pageSize || 25;
    const foundUsers = [];

    const users = await this.userModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');
    for (const user of users) {
      foundUsers.push(
        (await user.populate(['bets', 'withdraw', 'withdraws']))['_doc'],
      );
    }

    const totalItems: number = (await this.userModel.find()).length;

    if (status !== undefined)
      switch (status) {
        case GetUsersStatus.ALL:
          return {
            data: foundUsers,
            pagination: { pageIndex, pageSize, totalItems },
          };
        case GetUsersStatus.IN_LINE:
          let users = [];

          users = (
            await this.userModel
              .find()
              .populate(['bets', 'withdraw', 'withdraws'])
          )['_doc'];

          for (const user of users) {
            if (user?.bets && user?.bets.length > 0) {
              for (const bet of user?.bets) {
                if (bet.status) {
                }
              }
            }
          }
          return users;
        default:
          return this.userModel
            .find()
            .populate(['bets', 'withdraw', 'withdraws']);
      }
    else {
      return this.userModel.find().populate(['bets', 'withdraw', 'withdraws']);
    }
  }

  getOneUser(userId: string) {
    return this.userModel
      .findById(userId)
      .populate(['bets', 'withdraw', 'withdraws']);
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $set: { ...updateUserDto } },
      { new: true, upsert: true },
    );
  }

  deleteUser(userId: string) {
    return this.userModel.findByIdAndDelete(userId);
  }

  async findOne(username: string) {
    return this.userModel
      .findOne({ phone_number: username })
      .populate(['bets', 'withdraw', 'withdraws']);
  }

  async getUserHaveRecentBet() {
    const users = await this.userModel
      .find()
      .populate(['bets', 'withdraw', 'withdraws']);

    for (const user of users) {
      if (user.bets.length) {
      }
    }
  }
}
