import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { TotalAmount } from '../bet/types/total-amount';
import { Bet } from '../bet/dto/bet.output';
import { InjectModel } from '@nestjs/mongoose';
import { ModelName } from '../helpers';
import { Model } from 'mongoose';
import { BetService } from '../bet/bet.service';
import { UserDocument } from '../user/user.schema';
import { WithdrawDocument } from './withdraw.schema';
import { BetDocument } from '../bet/schema/bet.schema';
import { GetUsersStatus } from '../helpers/enums/get-users-status.enum';
import { BetStatus } from '../helpers/enums';

@Injectable()
export class WithdrawService {
  constructor(
    @InjectModel(ModelName.BET)
    private betModel: Model<BetDocument>,
    @InjectModel(ModelName.WITHDRAW)
    private withdrawModel: Model<WithdrawDocument>,
    @InjectModel(ModelName.USER)
    private userModel: Model<UserDocument>,
    private betService: BetService,
  ) {}

  async createWithdraw(createWithdrawDto: CreateWithdrawDto) {
    const { userId, amount } = createWithdrawDto;
    const totalAmountOfUser: TotalAmount =
      await this.betService.getAllTotalOfBetOfUser(userId);

    const user = (await this.userModel.findById(userId))['_doc'];

    if (user?.withdraw) {
      throw new HttpException(
        `Vous ne pouvez pas effectuer cette operation car vous avez deja un retrait en cours`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (amount > totalAmountOfUser.available) {
      throw new HttpException(
        `Votre solde disponible est inferieur retrait demander`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const bets: Bet[] = await this.betModel.find({ user: userId });
    let remain = amount;
    let i = 0;
    while (remain > 0) {
      const currentBet = bets[i];
      if (currentBet.available_amount > 0) {
        if (currentBet.available_amount < remain) {
          await this.betModel.findByIdAndUpdate(
            currentBet.id,
            {
              $set: {
                withdraw_amount:
                  currentBet.withdraw_amount + currentBet.available_amount,
                is_in_withdraw: true,
              },
            },
            { new: true, upsert: true },
          );
          remain -= currentBet.available_amount;
        } else {
          await this.betModel.findByIdAndUpdate(
            currentBet.id,
            {
              $set: {
                withdraw_amount: remain + currentBet.withdraw_amount,
                is_in_withdraw: true,
              },
            },
            { new: true, upsert: true },
          );
          remain = 0;
        }
      }
      i++;
    }
    const createdWithdraw = (
      await this.withdrawModel.create({
        user: userId,
        amount: amount,
      })
    )['_doc'];

    await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: { withdraw: createdWithdraw._id },
        $push: { withdraws: createdWithdraw._id },
      },
      { new: true, upsert: true },
    );

    return { success: 'retrait effectuer avec succes' };
  }

  async validateWithdraw(userId: string) {
    const user = await this.userModel.findById(userId).populate(['withdraw']);
    const withdraw_amount = user?.withdraw?.amount;
    console.log(withdraw_amount);

    if (!withdraw_amount) {
      throw new HttpException(
        `Cet utilisateur n'a pas de retrait en cours`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    // const bets: Bet[] = await this.betModel.find({ user: userId });

    // let remain = withdraw_amount;
    // let i = 0;
    // while (remain > 0) {
    //   const currentBet = bets[i];
    //   if (currentBet.available_amount > 0) {
    //     if (currentBet.available_amount < remain) {
    //       await this.betModel.findByIdAndUpdate(
    //         currentBet.id,
    //         {
    //           $set: {
    //             available_amount: 0,
    //             is_in_withdraw: false,
    //           },
    //         },
    //         { new: true, upsert: true },
    //       );
    //       remain -= currentBet.available_amount;
    //     } else {
    //       await this.betModel.findByIdAndUpdate(
    //         currentBet.id,
    //         {
    //           $set: {
    //             available_amount:
    //               currentBet.available_amount - currentBet.withdraw_amount,
    //             is_in_withdraw: false,
    //           },
    //         },
    //         { new: true, upsert: true },
    //       );
    //       remain = 0;
    //     }
    //   }
    //   i++;
    // }

    await this.userModel.findByIdAndUpdate(
      userId,
      { $set: { withdraw: null } },
      { new: true, upsert: true },
    );

    const currentUserWithdraws = await this.withdrawModel.find({
      user: userId,
    });

    await this.withdrawModel.findByIdAndUpdate(
      currentUserWithdraws[currentUserWithdraws.length - 1]._id,
      { $set: { is_validate: true } },
      { new: true, upsert: true },
    );

    return { success: 'retrait valider avec succes' };
  }

  async getWithdraw(pageIndex: number, pageSize: number, status: string) {
    const skip = pageSize * ((pageIndex || 1) - 1);
    const limit = pageSize || 25;
    const foundWithdraws = [];

    const withdraws = await this.withdrawModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');
    for (const withdraw of withdraws) {
      foundWithdraws.push((await withdraw.populate(['user']))['_doc']);
    }

    const totalItems: number = (await this.withdrawModel.find()).length;

    if (status !== undefined)
      switch (status) {
        case GetUsersStatus.ALL:
          return {
            data: foundWithdraws,
            pagination: { index: pageIndex, size: pageSize, total: totalItems },
          };
        case GetUsersStatus.IN_LINE:
          let users = [];
          users = await this.withdrawModel
            .find()
            .where('status')
            .equals(BetStatus.IN_PROGRESS);
          return users;
        default:
          return this.withdrawModel.find();
      }
    else {
      return this.withdrawModel.find().populate(['user']);
    }
  }

  async getUserWithdraw(pageIndex, pageSize, userId) {
    const skip = pageSize * ((pageIndex || 1) - 1);
    const limit = pageSize || 25;
    return this.withdrawModel
      .find({ user: userId })
      .skip(skip)
      .limit(limit)
      .sort('-createdAt')
      .populate(['user']);
  }
}
