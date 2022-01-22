import { Module } from '@nestjs/common';
import { MoneyTransactionController } from './money-transaction.controller';
import { MoneyTransactionService } from './money-transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MoneyTransactionRepository } from './money-transaction.repository';
import { CategoryService } from 'src/category/category.service';
import { CategoryRepository } from 'src/category/category.repository';
import { CategoryController } from 'src/category/category.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MoneyTransactionRepository, CategoryRepository]),
    AuthModule
  ],
  controllers: [MoneyTransactionController, CategoryController],
  providers: [MoneyTransactionService, CategoryService],

})
export class MoneyTransactionModule { }
