import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/user.schema';
import mongoose, { Document } from 'mongoose';
import { ModelName } from '../../helpers';
import { BetStatus } from '../../helpers/enums';

export type BetDocument = Bet & Document;

@Schema({ timestamps: true })
export class Bet {
  @Prop({ required: true })
  bet_amount: number;

  @Prop({ required: false, default: 0 })
  balance_amount: number;

  @Prop({ required: false, default: 0 })
  available_amount: number;

  @Prop({ required: false, default: 0 })
  retained_amount: number;

  @Prop({ required: false, default: 0 })
  active_duration: number;

  @Prop({ required: false, default: 0 })
  withdraw_amount: number;

  @Prop({ required: true, default: new Date() })
  start_of_bet: Date;

  @Prop({ required: false })
  end_of_bet: Date;

  @Prop({ required: true, default: BetStatus.IN_PROGRESS })
  status: string;

  @Prop({ required: true })
  payment_reference: string;

  @Prop({ required: false })
  is_validate: boolean;

  @Prop({ required: true, default: false })
  is_in_withdraw: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ModelName.USER })
  user: User;
}

export const BetSchema = SchemaFactory.createForClass(Bet);
