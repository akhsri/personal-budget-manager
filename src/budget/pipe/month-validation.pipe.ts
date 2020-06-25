import { PipeTransform, BadRequestException } from "@nestjs/common";
import { Month } from "../month.enum";

export class MonthValidationPipe implements PipeTransform {

    readonly allowedMonths = [
        Month.JANUARY,
        Month.FEBRUARY,
        Month.MARCH,
        Month.APRIL,
        Month.MAY,
        Month.JUNE,
        Month.JULY,
        Month.AUGUST,
        Month.SEPTEMBER,
        Month.OCTOBER,
        Month.NOVEMBER,
        Month.DECEMBER
    ];

    transform(value: any) {
        value = value.toUpperCase();
        if (!this.isMonthValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid month`);
        }

        return value;
    }



    private isMonthValid(month: any) {
        const idx = this.allowedMonths.indexOf(month);
        return idx !== -1;
    }
}