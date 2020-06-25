import { Module } from '@nestjs/common';
import { MoneyTransactionController } from './money-transaction.controller';
import { MoneyTransactionService } from './money-transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MoneyTransactionRepository } from './money-transaction.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MoneyTransactionRepository]),
    AuthModule
  ],
  controllers: [MoneyTransactionController],
  providers: [MoneyTransactionService],

})
export class MoneyTransactionModule { }
