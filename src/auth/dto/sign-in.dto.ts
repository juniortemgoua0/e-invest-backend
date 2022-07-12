import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class SignInDto {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string
}
