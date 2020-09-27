import { EntityRepository, Repository } from "typeorm";
import { Budget } from "./budget.entity";
import { CreateBudgetDto } from "./dto/create-budget.dto";
import { User } from "../auth/user.entity";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@EntityRepository(Budget)
export class BudgetRepository extends Repository<Budget>{
    async addBudget(createBudgetDto: CreateBudgetDto, user: User): Promise<Budget> {
        const { budgetAmount, budgetName, month, year, categoryId } = createBudgetDto;
        const budget = new Budget();
        budget.budgetName = budgetName;
        budget.budgetAmount = budgetAmount;
        budget.month = month;
        budget.year = year;
        budget.userId = user.id;
        budget.categoryId = categoryId;

        try {
            await budget.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return budget;

    }

    async getBudgets(
        user: User
    ): Promise<Budget[]> {
        return this.find({ where: { userId: user.id } })
    }

    async getBudgetById(
        user: User,
        id: number
    ): Promise<Budget> {
        const budget = await this.findOne({ where: { userId: user.id, id: id } });
        if (!budget) {
            throw new NotFoundException(`Budget with ${id} not found`);
        }
        return budget;
    }

    async updateBudgetById(
        createBudgetDto: CreateBudgetDto,
        user: User,
        id: number
    ): Promise<Budget> {
        const { budgetAmount, budgetName, month, year, categoryId } = createBudgetDto;
        const budget = await this.getBudgetById(user, id);
        budget.budgetName = budgetName;
        budget.budgetAmount = budgetAmount;
        budget.month = month;
        budget.year = year;
        budget.userId = user.id;
        budget.categoryId = categoryId;

        try {
            await budget.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return budget;
    }
}