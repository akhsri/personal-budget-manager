import { PipeTransform, BadRequestException } from "@nestjs/common";
import Moment from "moment";

export class YearValidationPipe implements PipeTransform {

    transform(value: any) {
        const parsedValue = parseInt(value);
        if (parsedValue == NaN) {
            throw new BadRequestException(`"${value}" is an invalid year`);
        }
        const currentYear = Moment().year();
        if (currentYear > parsedValue) {
            throw new BadRequestException(`"${value}" is an invalid year`);
        }
        if (parsedValue.toString().length !== 4) {
            throw new BadRequestException(`"${value}" is an invalid year`);
        }
        return parsedValue;
    }
}