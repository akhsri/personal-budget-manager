import { IsString, IsNumber } from "class-validator";
import { Month } from "../month.enum";

export class CreateBudgetDto {
    @IsString()
    budgetName: string;

    @IsNumber()
    budgetAmount: number;

    month: Month;

    @IsNumber()
    year: number;

    @IsNumber()
    categoryId: number;


}