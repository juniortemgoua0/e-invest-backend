import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @IsOptional()
  @IsString()
  role: string;
}
