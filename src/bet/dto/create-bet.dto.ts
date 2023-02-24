import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBetDto {
  @IsNumber()
  @IsNotEmpty()
  bet_amount: number;

  balance_amount?: number;

  available_amount?: number;

  retained_amount?: number;

  active_duration?: number;

  @IsString()
  payment_reference: string;

  end_of_bet: Date;
}
