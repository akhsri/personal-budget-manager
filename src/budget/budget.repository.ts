import { EntityRepository, Repository } from "typeorm";
import { Budget } from "./budget.entity";
import { CreateBudgetDto } from "./dto/create-budget.dto";
import { User } from "../auth/user.entity";
import { InternalServerErrorException } from "@nestjs/common";

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
}