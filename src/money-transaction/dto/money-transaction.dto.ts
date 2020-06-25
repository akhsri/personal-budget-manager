import { IsString, IsDateString, IsNumber, IsOptional } from "class-validator";
import { MoneyTransactionType } from "../money-transaction-type.enum";
import { IsNull } from "typeorm";

export class MoneyTransactionDto {

    @IsString()
    moneyTransactionType: MoneyTransactionType;

    @IsOptional()
    @IsString()
    payer: string;

    @IsOptional()
    @IsString()
    payee: string;

    @IsNumber()
    categoryId: number;

    @IsDateString()
    occuredAt: Date;
}