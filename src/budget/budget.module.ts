import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetRepository } from './budget.repository';
import { AuthModule } from '../auth/auth.module';
import { CategoryRepository } from '../category/category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BudgetRepository, CategoryRepository]),
    AuthModule
  ],
  controllers: [BudgetController],
  providers: [BudgetService]
})
export class BudgetModule { }
