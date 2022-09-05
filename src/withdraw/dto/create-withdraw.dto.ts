import { IsNumber, IsString } from 'class-validator';

export class CreateWithdrawDto {
  @IsNumber()
  amount: number;

  @IsString()
  userId: string;
}
