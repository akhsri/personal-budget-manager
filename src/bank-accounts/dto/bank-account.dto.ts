import { IsString, IsNumber } from "class-validator";

export class BankAccountsDto {

    @IsString()
    accountName: string;

    @IsNumber()
    starterAmount: number;
}