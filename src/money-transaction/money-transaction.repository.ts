import { Repository, EntityRepository } from "typeorm";
import { MoneyTransaction } from "./money-transaction.entity";
import { MoneyTransactionDto } from "./dto/money-transaction.dto";
import { User } from "../auth/user.entity";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@EntityRepository(MoneyTransaction)
export class MoneyTransactionRepository extends Repository<MoneyTransaction>{

    async addMoneyTransaction(moneyTransactionDto: MoneyTransactionDto, user: User): Promise<MoneyTransaction> {
        const { moneyTransactionType, payee, payer, amount, occuredAt, categoryId } = moneyTransactionDto;

        const moneyTransaction = new MoneyTransaction();
        moneyTransaction.moneyTransactionType = moneyTransactionType;
        moneyTransaction.payee = payee;
        moneyTransaction.payer = payer;
        moneyTransaction.amount = amount;
        moneyTransaction.categoryId = categoryId;
        moneyTransaction.occuredAt = occuredAt;
        moneyTransaction.userId = user.id;

        try {
            await moneyTransaction.save()
        } catch (error) {
            console.log("ERROR: ", error);
            throw new InternalServerErrorException();
        }
        return moneyTransaction;

    }

    async getMoneyTransactions(
        user: User
    ): Promise<MoneyTransaction[]> {
        return this.find({ where: { userId: user.id } });
    }

    async getMoneyTransactionById(
        user: User,
        id: number
    ): Promise<MoneyTransaction> {
        const found = await this.findOne({ where: { id, userId: user.id } });
        if (!found) {
            throw new NotFoundException(`Transaction with id ${id} not found`);
        }
        return found;
    }

    async updateMoneyTransactionById(
        moneyTransactionDto: MoneyTransactionDto,
        user: User,
        id: number
    ): Promise<MoneyTransaction> {
        const { moneyTransactionType, payee, payer, amount, occuredAt, categoryId } = moneyTransactionDto;
        const moneyTransaction = await this.getMoneyTransactionById(user, id);
        moneyTransaction.moneyTransactionType = moneyTransactionType;
        moneyTransaction.payee = payee;
        moneyTransaction.payer = payer;
        moneyTransaction.amount = amount;
        moneyTransaction.categoryId = categoryId;
        moneyTransaction.occuredAt = occuredAt;
        moneyTransaction.userId = user.id;

        try {
            await moneyTransaction.save()
        } catch (error) {
            console.log("ERROR: ", error);
            throw new InternalServerErrorException();
        }
        return moneyTransaction;
    }

    async deleteMoneyTransactionById(
        user: User,
        id: number
    ): Promise<void> {
        const result = await this.delete({ userId: user.id, id: id });
        if (result.affected === 0) {
            throw new NotFoundException(`Transaction with ${id} not found`);
        }
    }
}