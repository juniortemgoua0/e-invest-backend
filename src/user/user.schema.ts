import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ModelName } from '../helpers';
import { Bet } from '../bet/schema/bet.schema';
import { Role } from '../helpers/role';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: false })
  first_name: string;

  @Prop({ required: false })
  last_name: string;

  @Prop({ required: true, default: '' })
  email: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, default: '' })
  qr_code: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: ModelName.BET }],
    default: [],
  })
  bets: Bet[];

  @Prop({ required: true, default: Role.USER })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
