import {IsNotEmpty, IsString} from "class-validator";

export class CheckUsernameDto{

    @IsNotEmpty()
    @IsString()
    school_id: string;

    @IsNotEmpty()
    @IsString()
    username: string;
}