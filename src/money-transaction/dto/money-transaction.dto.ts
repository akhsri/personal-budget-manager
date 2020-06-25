import { IsString, IsDateString } from "class-validator";
import { MoneyTransactionType } from "../money-transaction-type.enum";

export class MoneyTransactionDto {

    @IsString()
    moneyTransactionType: MoneyTransactionType;

    @IsString()
    payer: string;

    @IsString()
    payee: string;

    @IsDateString()
    occuredAt: Date;
}