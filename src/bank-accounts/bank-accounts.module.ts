import { Module } from '@nestjs/common';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsService } from './bank-accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountsRepository } from './bank-accounts.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BankAccountsRepository]), 
    AuthModule
  ],
  controllers: [BankAccountsController],
  providers: [BankAccountsService]
})
export class BankAccountsModule { }
