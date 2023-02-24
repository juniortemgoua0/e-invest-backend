import { IsNumber } from 'class-validator';

export class UpdateSettingDto {
  @IsNumber()
  timeOfBet: number;

  @IsNumber()
  factor: number;

  // @IsNumber()
  // descTime: number;

  // @IsNumber()
  // ascTime: number;
}
