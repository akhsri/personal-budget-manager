import { Repository, EntityRepository } from "typeorm";
import { MoneyTransaction } from "./money-transaction.entity";
import { MoneyTransactionDto } from "./dto/money-transaction.dto";
import { User } from "../auth/user.entity";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(MoneyTransaction)
export class MoneyTransactionRepository extends Repository<MoneyTransaction>{

    async addMoneyTransaction(moneyTransactionDto: MoneyTransactionDto, user: User): Promise<MoneyTransaction> {
        const { moneyTransactionType, payee, payer, occuredAt, categoryId } = moneyTransactionDto;

        const moneyTransaction = new MoneyTransaction();
        moneyTransaction.moneyTransactionType = moneyTransactionType;
        moneyTransaction.payee = payee;
        moneyTransaction.payer = payer;
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
}