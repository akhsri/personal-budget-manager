import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccountsRepository } from './bank-accounts.repository';
import { BankAccountsDto } from './dto/bank-account.dto';
import { BankAccount } from './bank-accounts.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class BankAccountsService {
    constructor(
        @InjectRepository(BankAccountsRepository)
        private bankAccountsRepository: BankAccountsRepository,
    ) { }

    async addBankAccount(bankAccountsDto: BankAccountsDto, user: User): Promise<BankAccount> {
        return this.bankAccountsRepository.addBankAccount(bankAccountsDto, user)
    }

    async getBankAccounts(
        user: User
    ): Promise<BankAccount[]> {
        return this.bankAccountsRepository.getBankAccounts(user);
    }

}
