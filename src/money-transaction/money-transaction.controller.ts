import {
  Controller,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MoneyTransactionService } from './money-transaction.service';
import { MoneyTransactionDto } from './dto/money-transaction.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { MoneyTransaction } from './money-transaction.entity';
import { Transaction } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import * as moment from 'moment';

@Controller('money-transaction')
@UseGuards(AuthGuard())
export class MoneyTransactionController {
  constructor(
    private moneyTransactionService: MoneyTransactionService,
    private categoryService: CategoryService,
  ) {}

  @Get('/monthly-overview')
  async getMonthlyOverview(@GetUser() user: User) {
    //console.log('inside MO');
    const allTransactions = await this.moneyTransactionService.getMoneyTransactions(
      user,
    );
    //console.log('allTransactions: ', allTransactions);
    let totalMonthlyExpense = 0,
      totalMonthlyIncome = 0;
    allTransactions.forEach((transaction) => {
      if (transaction.moneyTransactionType === 'EXPENSE') {
        totalMonthlyExpense += transaction.amount;
      } else {
        totalMonthlyIncome += transaction.amount;
      }
    });
    const allCategories = await this.categoryService.getCategories(user);
    let monthlyOverview = {
      totalMonthlyExpense,
      totalMonthlyIncome,
      expensesByCategory: [],
    };
    //console.log('allCategories: ', allCategories);
    allCategories.map(async (category) => {
      //console.log("CATEGORY: ", category)
      let categorySpecificMonthlyTransactions;
      categorySpecificMonthlyTransactions = allTransactions.filter(
        (transaction) => {
          console.log(
            'category.id === transaction.categoryId: ',
            category.id === transaction.categoryId,
          );
          console.log(
            'moment(transaction.createdAt).month() === moment().month(): ',
            moment(transaction.createdAt).month() === moment().month(),
          );
          console.log(
            'moment(transaction.createdAt).year() === moment().year(): ',
            moment(transaction.createdAt).year() === moment().year(),
          );
          return (
            category.id === transaction.categoryId &&
            moment(transaction.createdAt).month() === moment().month() &&
            moment(transaction.createdAt).year() === moment().year()
          );
        },
      );
      let totalIncome = 0,
        totalExpense = 0,
        categoryBudgetAmountforCurrentMonth,
        budgetPercentageUsed,
        budgetPercentageLeft;
      let categoryBudgets = category.budgets;
      let categoryBudgetforCurrentMonth = categoryBudgets.find(
        (categoryBudget) =>
          categoryBudget.month.toString() == moment().format('MMMM'),
      );
      console.log(
        'categoryBudgetforCurrentMonth: ',
        categoryBudgetforCurrentMonth,
      );
      if (categoryBudgetforCurrentMonth) {
        categoryBudgetAmountforCurrentMonth =
          categoryBudgetforCurrentMonth.budgetAmount;
        //console.log("categoryBudgetAmountforCurrentMonth: ",categoryBudgetAmountforCurrentMonth)
        //   console.log(
        //     'categoryBudgetAmountforCurrentMonth: ',
        //     categoryBudgetAmountforCurrentMonth,
        //   );
        //   console.log('currentMonth: ', moment().format('MMMM'));
        //   console.log('categoryBudgets: ', categoryBudgets);
        categorySpecificMonthlyTransactions.forEach((transaction) => {
          if (transaction.moneyTransactionType === 'EXPENSE') {
            totalExpense += transaction.amount;
          } else {
            totalIncome += transaction.amount;
          }
        });

        budgetPercentageUsed = (
          (totalExpense / categoryBudgetAmountforCurrentMonth) *
          100
        ).toFixed(2);
        let budgetPercentageLeft;
        if(budgetPercentageUsed> 100){
            budgetPercentageLeft = 0;
        } else {
            budgetPercentageLeft = 100 - budgetPercentageUsed;
        }
        let categoryMonthlyOverview = {
          totalExpense,
          totalIncome,
          categoryBudgetAmountforCurrentMonth,
          categoryName: category.categoryName,
          categoryId: category.id,
          budgetPercentageUsed,
          budgetPercentageLeft: budgetPercentageLeft,
        };
        //console.log("categoryMonthlyOverview: ", categoryMonthlyOverview)
        monthlyOverview.expensesByCategory.push(categoryMonthlyOverview);
      }
    });
    return monthlyOverview;
  }

  @Get('/:id')
  getMoneyTransactionById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MoneyTransaction> {
    return this.moneyTransactionService.getMoneyTransactionById(user, id);
  }

  @Patch('/:id')
  updateMoneyTransactionById(
    @Body() moneyTransactionDto: MoneyTransactionDto,
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MoneyTransaction> {
    return this.moneyTransactionService.updateMoneyTransactionById(
      moneyTransactionDto,
      user,
      id,
    );
  }

  @Delete('/:id')
  deleteMoneyTransactionById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.moneyTransactionService.deleteMoneyTransactionById(user, id);
  }

  @Post('/create')
  addMoneyTransaction(
    @Body(ValidationPipe)
    moneyTransactionDto: MoneyTransactionDto,
    @GetUser() user: User,
  ): Promise<MoneyTransaction> {
    return this.moneyTransactionService.addMoneyTransaction(
      moneyTransactionDto,
      user,
    );
  }

  @Get()
  getMoneyTransactions(@GetUser() user: User): Promise<MoneyTransaction[]> {
    return this.moneyTransactionService.getMoneyTransactions(user);
  }
}
