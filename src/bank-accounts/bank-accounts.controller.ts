import { Controller, Post, Body, ValidationPipe, UseGuards, Get, Query, ParseIntPipe, Param } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsDto } from './dto/bank-account.dto';
import { BankAccount } from './bank-accounts.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('bank-accounts')
@UseGuards(AuthGuard())
export class BankAccountsController {
    constructor(private bankAccountsService: BankAccountsService) { }

    @Post('/create')
    addBankAccount(@Body(ValidationPipe)
    bankAccountsDto: BankAccountsDto,
        @GetUser() user: User
    ): Promise<BankAccount> {
        return this.bankAccountsService.addBankAccount(bankAccountsDto, user);
    }

    @Get()
    getBankAccounts(
        @GetUser() user: User
    ): Promise<BankAccount[]> {
        return this.bankAccountsService.getBankAccounts(user);
    }

    @Get('/:id')
    getBankAccount(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) id: number
    ): Promise<BankAccount> {
        return this.bankAccountsService.getBankAccountById(user, id)
    }
}
