import {MigrationInterface, QueryRunner} from "typeorm";

export class TransactionAmount1593324877409 implements MigrationInterface {
    name = 'TransactionAmount1593324877409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bank_account" ("id" SERIAL NOT NULL, "accountName" character varying NOT NULL, "starterAmount" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_f3246deb6b79123482c6adb9745" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "budget" ("id" SERIAL NOT NULL, "budgetName" character varying NOT NULL, "budgetAmount" integer NOT NULL, "month" character varying NOT NULL, "year" integer NOT NULL, "userId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_9af87bcfd2de21bd9630dddaa0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "money_transaction" ("id" SERIAL NOT NULL, "moneyTransactionType" character varying NOT NULL, "payer" character varying, "payee" character varying, "amount" integer NOT NULL, "categoryId" integer NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "occuredAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_6466d8a94df4ad2a1be6c5c2af1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "categoryName" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bank_account" ADD CONSTRAINT "FK_c2ba1381682b0291238cbc7a65d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget" ADD CONSTRAINT "FK_8ed65c868c97a5fb471d85efb01" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget" ADD CONSTRAINT "FK_4aeadf37446801c8f4d2d26441b" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "money_transaction" ADD CONSTRAINT "FK_013a5f8049ebdfd0fbedf93ab3b" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "money_transaction" ADD CONSTRAINT "FK_ed0bddcd4d532b0049f0a2dc99c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`);
        await queryRunner.query(`ALTER TABLE "money_transaction" DROP CONSTRAINT "FK_ed0bddcd4d532b0049f0a2dc99c"`);
        await queryRunner.query(`ALTER TABLE "money_transaction" DROP CONSTRAINT "FK_013a5f8049ebdfd0fbedf93ab3b"`);
        await queryRunner.query(`ALTER TABLE "budget" DROP CONSTRAINT "FK_4aeadf37446801c8f4d2d26441b"`);
        await queryRunner.query(`ALTER TABLE "budget" DROP CONSTRAINT "FK_8ed65c868c97a5fb471d85efb01"`);
        await queryRunner.query(`ALTER TABLE "bank_account" DROP CONSTRAINT "FK_c2ba1381682b0291238cbc7a65d"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "money_transaction"`);
        await queryRunner.query(`DROP TABLE "budget"`);
        await queryRunner.query(`DROP TABLE "bank_account"`);
    }

}
