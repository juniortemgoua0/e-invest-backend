import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWithdrawDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
