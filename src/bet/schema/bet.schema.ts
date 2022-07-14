import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {User} from "../../user/user.schema";
import mongoose, {Document} from "mongoose";
import {ModelName} from "../../helpers";
import {BetStatus} from "../../helpers/enums";

export type BetDocument = Bet & Document

@Schema({timestamps: true})
export class Bet {

  @Prop({required: true})
  bet_amount: number;

  @Prop({required: true})
  balance_amount: number;

  @Prop({required: true})
  available_amount: number;

  @Prop({required: true})
  retained_amount: number;

  @Prop({required: true})
  active_duration: number;

  @Prop({required: true, default: new Date()})
  start_of_bet: Date;

  @Prop({required: false})
  end_of_bet: Date;

  @Prop({required: true ,default: BetStatus.IN_PROGRESS })
  status: string;

  @Prop({required: true})
  payment_reference: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: ModelName.USER})
  user: User;
}

export const BetSchema = SchemaFactory.createForClass(Bet);
