import { Controller, UseGuards, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Budget } from './budget.entity';

@Controller('budget')
@UseGuards(AuthGuard())
export class BudgetController {
    constructor(
        private budgetService: BudgetService
    ) { }

    @Post('/create')
    addBudget(@Body(ValidationPipe)
    createBudgetDto: CreateBudgetDto,
        @GetUser() user: User
    ): Promise<Budget> {
        return this.budgetService.addbudget(createBudgetDto, user);
    }

    @Get()
    getBudgets(
        @GetUser() user: User
    ): Promise<Budget[]> {
        return this.budgetService.getBudgets(user);
    }
}
