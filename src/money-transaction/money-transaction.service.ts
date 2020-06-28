import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoneyTransactionRepository } from './money-transaction.repository';
import { MoneyTransactionDto } from './dto/money-transaction.dto';
import { User } from '../auth/user.entity';
import { MoneyTransaction } from './money-transaction.entity';

@Injectable()
export class MoneyTransactionService {
    constructor(
        @InjectRepository(MoneyTransactionRepository)
        private moneyTransactionRepository: MoneyTransactionRepository,
    ) { }

    async addMoneyTransaction(moneyTransactionDto: MoneyTransactionDto, user: User): Promise<MoneyTransaction> {
        return this.moneyTransactionRepository.addMoneyTransaction(moneyTransactionDto, user);
    }

    async getMoneyTransactions(user: User): Promise<MoneyTransaction[]> {
        return this.moneyTransactionRepository.getMoneyTransactions(user);
    }

    async getMoneyTransactionById(
        user: User,
        id: number
    ) {
        return this.moneyTransactionRepository.getMoneyTransactionById(user, id);
    }
}
