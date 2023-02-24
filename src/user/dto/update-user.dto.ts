import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
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
  @IsString()
  phone_number: string;

  @IsEmpty()
  // @IsString()
  password: string;

  @IsEmpty()
  // @IsString()
  confirm_password: string;

  @IsEmpty()
  // @IsString()
  qr_code: string;
}
