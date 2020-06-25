import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as typeOrmConfig from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { CategoryModule } from './category/category.module';
import { BudgetModule } from './budget/budget.module';
import { MoneyTransactionModule } from './money-transaction/money-transaction.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    BankAccountsModule,
    CategoryModule,
    BudgetModule,
    MoneyTransactionModule,

  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
