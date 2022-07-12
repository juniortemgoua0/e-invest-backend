import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {PaymentStatusEnum} from "../../helpers/enums/payment-status.enum";
import mongoose, {Document} from "mongoose";
import {ModelName} from "../../helpers";
import {User} from "../../user/user.schema";

export type PaymentDocument = Payment & Document;

@Schema({timestamps: true})
export class Payment {

  @Prop({required: true})
  amount: number;

  @Prop({required: true})
  phone_number: string;

  @Prop({required: true})
  payment_mode: string;

  @Prop({required: false})
  reference: string;

  @Prop({required: true, default: PaymentStatusEnum.PENDING})
  status: string;

  @Prop({type: mongoose.Schema.Types.ObjectId , ref: ModelName.USER})
  user: User;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
