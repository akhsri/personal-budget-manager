import { IsString, IsEmail } from "class-validator";

export class UserSigninDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}