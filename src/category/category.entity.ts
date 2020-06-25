import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "../auth/user.entity";
import { Budget } from "../budget/budget.entity";
import { MoneyTransaction } from "../money-transaction/money-transaction.entity";

@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    categoryName: string;

    @ManyToOne(type => User, user => user.categories, { eager: false })
    user!: User;

    @Column({ type: 'int', nullable: false })
    userId: number;

    @OneToMany(type => Budget, budget => budget.category, { eager: true })
    budgets: Budget[];

    @OneToMany(type => MoneyTransaction, moneyTransaction => moneyTransaction.category, { eager: true })
    moneyTransactions: MoneyTransaction[]
}