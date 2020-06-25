import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { User } from "../auth/user.entity";
import { Month } from "./month.enum";
import { Category } from "../category/category.entity";

@Entity()
export class Budget extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    budgetName: string;

    @Column()
    budgetAmount: number;

    @Column()
    month: Month;

    @Column()
    year: number;

    @ManyToOne(type => User, user => user.budgets, { eager: false })
    user!: User;

    @Column({ type: 'int', nullable: false })
    userId: number;

    @ManyToOne(type => Category, category => category.budgets, { eager: false })
    category: Category;

    @Column({ type: 'int', nullable: false })
    categoryId: number;


}