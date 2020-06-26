import { Controller, UseGuards, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MoneyTransactionService } from './money-transaction.service';
import { MoneyTransactionDto } from './dto/money-transaction.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { MoneyTransaction } from './money-transaction.entity';

@Controller('money-transaction')
@UseGuards(AuthGuard())
export class MoneyTransactionController {
    constructor(
        private moneyTransactionService: MoneyTransactionService
    ) { }

    @Post('/create')
    addMoneyTransaction(@Body(ValidationPipe)
    moneyTransactionDto: MoneyTransactionDto,
        @GetUser() user: User
    ): Promise<MoneyTransaction> {
        return this.moneyTransactionService.addMoneyTransaction(moneyTransactionDto, user);
    }

    @Get()
    getMoneyTransactions(@GetUser() user: User): Promise<MoneyTransaction[]> {
        return this.moneyTransactionService.getMoneyTransactions(user);
    }
}
