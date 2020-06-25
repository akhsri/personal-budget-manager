import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../auth/user.entity";

@Entity()
export class BankAccount extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountName: string;

    @Column()
    starterAmount: number;

    @ManyToOne(type => User, user => user.bankAccounts, { eager: false })
    user!: User;

    @Column({ type: 'int', nullable: false })
    userId: number;
}