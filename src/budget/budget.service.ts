import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BudgetRepository } from './budget.repository';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { User } from '../auth/user.entity';
import { Budget } from './budget.entity';
import { CategoryRepository } from '../category/category.repository';
import { Category } from '../category/category.entity';

@Injectable()
export class BudgetService {
    constructor(
        @InjectRepository(BudgetRepository)
        private budgetRepository: BudgetRepository,
        @InjectRepository(CategoryRepository)
        private categoryRepository: CategoryRepository
    ) { }

    async addbudget(createBudgetDto: CreateBudgetDto, user: User): Promise<Budget> {
        const { categoryId } = createBudgetDto;
        let category: Category;
        try {
            category = await this.categoryRepository.findOne({ where: { id: categoryId, userId: user.id } });
        } catch (error) {
            throw new InternalServerErrorException();
        }
        if (!category) {
            throw new NotFoundException(`Category with category id ${categoryId} not found`);

        }
        return this.budgetRepository.addBudget(createBudgetDto, user);

    }

    async getBudgets(
        user: User
    ): Promise<Budget[]> {
        return this.budgetRepository.getBudgets(user);
    }

    async getBudgetById(
        user: User,
        id: number
    ): Promise<Budget> {
        return this.budgetRepository.getBudgetById(user, id);
    }

    async updateBudgetById(
        createBudgetDto: CreateBudgetDto,
        user: User,
        id: number
    ): Promise<Budget> {
        return this.budgetRepository.updateBudgetById(createBudgetDto, user, id);
    }

    async deleteBudgetById(
        user: User,
        id: number
    ): Promise<void> {
        return this.budgetRepository.deleteBudgetById(user, id);
    }
}
