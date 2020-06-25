import {MigrationInterface, QueryRunner} from "typeorm";

export class MoneyTransaction1593103060910 implements MigrationInterface {
    name = 'MoneyTransaction1593103060910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "money_transaction" DROP CONSTRAINT "FK_013a5f8049ebdfd0fbedf93ab3b"`);
        await queryRunner.query(`ALTER TABLE "money_transaction" ALTER COLUMN "categoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "money_transaction" ADD CONSTRAINT "FK_013a5f8049ebdfd0fbedf93ab3b" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "money_transaction" DROP CONSTRAINT "FK_013a5f8049ebdfd0fbedf93ab3b"`);
        await queryRunner.query(`ALTER TABLE "money_transaction" ALTER COLUMN "categoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "money_transaction" ADD CONSTRAINT "FK_013a5f8049ebdfd0fbedf93ab3b" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
