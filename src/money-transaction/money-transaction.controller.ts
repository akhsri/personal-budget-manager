import { Controller, UseGuards, Post, Body, ValidationPipe, Get, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
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

    @Get('/:id')
    getMoneyTransactionById(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) id: number
    ): Promise<MoneyTransaction> {
        console.log("In getMoneyTransactionById");
        return this.moneyTransactionService.getMoneyTransactionById(user, id);
    }

    @Patch('/:id')
    updateMoneyTransactionById(
        @Body() moneyTransactionDto: MoneyTransactionDto,
        @GetUser() user: User,
        @Param('id', ParseIntPipe) id: number
    ): Promise<MoneyTransaction> {
        return this.moneyTransactionService.updateMoneyTransactionById(moneyTransactionDto, user, id);
    }

    @Delete('/:id')
    deleteMoneyTransactionById(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) id: number
    ): Promise<void> {
        return this.moneyTransactionService.deleteMoneyTransactionById(user, id);
    }
}
