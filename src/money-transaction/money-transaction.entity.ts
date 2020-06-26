import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { MoneyTransactionType } from "./money-transaction-type.enum";
import { User } from "../auth/user.entity";
import { Category } from "../category/category.entity";

@Entity()
export class MoneyTransaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    moneyTransactionType: MoneyTransactionType;

    @Column({ type: 'varchar', nullable: true })
    payer: string;

    @Column({ type: 'varchar', nullable: true })
    payee: string;

    @Column()
    amount: number;

    @ManyToOne(type => Category, category => category.moneyTransactions, { eager: false })
    category!: Category;

    @Column({ type: 'int', nullable: false })
    categoryId: number;

    @ManyToOne(type => User, user => user.moneyTransaction, { eager: false })
    user!: User;

    @Column({ type: 'int', nullable: false })
    userId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    occuredAt: Date;




}