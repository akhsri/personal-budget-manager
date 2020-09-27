import { Controller, UseGuards, Post, Body, ValidationPipe, Get, Patch, ParseIntPipe, Param } from '@nestjs/common';
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

    @Get('/:id')
    getBudgetById(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) id: number
    ): Promise<Budget> {
        return this.budgetService.getBudgetById(user, id);
    }

    // @Patch()
    // updateBudgetById(
    //     @Body()
    //     createBudgetDto: CreateBudgetDto,
    //     @GetUser() user: User,
    //     id: number
    // ): Promise<Budget> {
    //     return this.budgetService.updateBudgetById(createBudgetDto, user, id);
    // }
}
