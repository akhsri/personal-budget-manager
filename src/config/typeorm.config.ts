import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'mybudgetmanager',
    password: 'aakash',
    database: 'budgetmanagement',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: false,
    logging: true,
    logger: 'file',
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    cli: {
        // Location of migration should be inside src folder
        // to be compiled into dist/ folder.
        migrationsDir: 'src/migrations',
    },
}


export = typeOrmConfig;