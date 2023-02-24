import { Withdraw, WithdrawDocument } from './../withdraw/withdraw.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BetDocument } from 'src/bet/schema/bet.schema';
import { Model } from 'mongoose';
import { ModelName } from 'src/helpers';
import { UserDocument } from 'src/user/user.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(ModelName.BET) private readonly betModel: Model<BetDocument>,
    @InjectModel(ModelName.WITHDRAW)
    private readonly withdrawModel: Model<WithdrawDocument>,
    @InjectModel(ModelName.USER)
    private readonly userModel: Model<UserDocument>,
  ) {}

  querySearch(type: string) {}
}
