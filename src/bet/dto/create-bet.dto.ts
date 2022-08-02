import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsString()
  payment_reference: string;

  end_of_bet: Date;
}
