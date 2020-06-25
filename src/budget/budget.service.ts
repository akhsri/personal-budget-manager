import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BudgetRepository } from './budget.repository';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { User } from '../auth/user.entity';
import { Budget } from './budget.entity';

@Injectable()
export class BudgetService {
    constructor(
        @InjectRepository(BudgetRepository)
        private budgetRepository: BudgetRepository
    ) { }

    async addbudget(createBudgetDto: CreateBudgetDto, user: User): Promise<Budget> {
        return this.budgetRepository.addBudget(createBudgetDto, user);
    }

    async getBudgets(
        user: User
    ): Promise<Budget[]> {
        return this.budgetRepository.getBudgets(user);
    }
}
