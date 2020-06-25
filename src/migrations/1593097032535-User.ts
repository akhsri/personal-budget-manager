import {MigrationInterface, QueryRunner} from "typeorm";

export class User1593097032535 implements MigrationInterface {
    name = 'User1593097032535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "money_transaction" ("id" SERIAL NOT NULL, "moneyTransactionType" character varying NOT NULL, "payer" character varying, "payee" character varying, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "occuredAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_6466d8a94df4ad2a1be6c5c2af1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "budget" DROP CONSTRAINT "FK_8ed65c868c97a5fb471d85efb01"`);
        await queryRunner.query(`ALTER TABLE "budget" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "budget" ADD CONSTRAINT "FK_8ed65c868c97a5fb471d85efb01" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "money_transaction" ADD CONSTRAINT "FK_ed0bddcd4d532b0049f0a2dc99c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "money_transaction" DROP CONSTRAINT "FK_ed0bddcd4d532b0049f0a2dc99c"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`);
        await queryRunner.query(`ALTER TABLE "budget" DROP CONSTRAINT "FK_8ed65c868c97a5fb471d85efb01"`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "budget" ADD CONSTRAINT "FK_8ed65c868c97a5fb471d85efb01" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "money_transaction"`);
    }

}
