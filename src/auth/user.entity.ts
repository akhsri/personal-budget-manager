import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { BankAccount } from "../bank-accounts/bank-accounts.entity";
import { Category } from "../category/category.entity";
import { Budget } from "../budget/budget.entity";
import { MoneyTransaction } from "../money-transaction/money-transaction.entity";

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => BankAccount, bankAccount => bankAccount.user, { eager: true })
    bankAccounts: BankAccount[];

    @OneToMany(type => Category, category => category.user, { eager: true })
    categories: Category[];

    @OneToMany(type => Budget, budget => budget.user, { eager: true })
    budgets: Budget[];

    @OneToMany(type => MoneyTransaction, moneyTransaction => moneyTransaction.user, { eager: true })
    moneyTransaction: MoneyTransaction[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

}