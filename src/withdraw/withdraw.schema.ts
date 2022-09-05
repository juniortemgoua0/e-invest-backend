import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';
import * as mongoose from 'mongoose';
import { ModelName } from '../helpers';

export type WithdrawDocument = Withdraw & Document;

@Schema({ timestamps: true })
export class Withdraw {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ModelName.USER,
    required: true,
  })
  user: User;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, default: false })
  is_validate: boolean;
}

export const WithdrawSchema = SchemaFactory.createForClass(Withdraw);
