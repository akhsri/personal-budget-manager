import { EntityRepository, Repository } from "typeorm";
import { BankAccount } from "./bank-accounts.entity";
import { BankAccountsDto } from "./dto/bank-account.dto";
import { InternalServerErrorException } from "@nestjs/common";
import { User } from "../auth/user.entity";

@EntityRepository(BankAccount)
export class BankAccountsRepository extends Repository<BankAccount> {
    async addBankAccount(bankAccountsDto: BankAccountsDto, user: User): Promise<BankAccount> {
        console.log("USER: ", user);
        const { accountName, starterAmount } = bankAccountsDto;
        const bankAccount = new BankAccount();
        bankAccount.accountName = accountName;
        bankAccount.starterAmount = starterAmount;
        bankAccount.user = user;


        try {

            await bankAccount.save();
        } catch (error) {
            console.log("ERROR: ", error);
            throw new InternalServerErrorException();
        }
        return bankAccount;
    }

    async getBankAccounts(
        user: User
    ): Promise<BankAccount[]> {
        return this.find({ where: { userId: user.id } })
    }

    async getBankAccountById(
        user: User,
        id: Number
    ): Promise<BankAccount> {
        return this.findOne({ where: { userId: user.id, id: id } })
    }
}