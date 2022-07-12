import {Prop} from "@nestjs/mongoose";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateBetDto {

  @IsNumber()
  @IsNotEmpty()
  bet_amount: number;

  @IsNumber()
  balance_amount: number;

  @IsNumber()
  available_amount: number;

  @IsNumber()
  retained_amount: number;

  @IsNumber()
  active_duration: number;

  @Prop({required: true})
  payment_reference: string;

  @IsString()
  user_id: string;
}
