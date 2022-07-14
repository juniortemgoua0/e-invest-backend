import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreatePaymentDto {

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  payment_mode: string;

}
