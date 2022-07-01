import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {

  @Prop({required: false})
  first_name: string;

  @Prop({required: false})
  last_name: string;

  @Prop({required: true, default: ""})
  email: string;

  @Prop({required: true})
  phone_number: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true , default: ""})
  qr_code: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
