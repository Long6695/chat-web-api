import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT
    ? parseInt(process.env.POSTGRES_PORT, 10)
    : 6500,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  logging: process.env.NODE_ENV !== 'production',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  // cli: {
  //   entitiesDir: 'src',
  //   migrationsDir: 'src/database/migrations',
  //   subscribersDir: 'subscriber',
  // },
  extra: {
    max: process.env.DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
      : 100,
    // ssl:
    //   process.env.DATABASE_SSL_ENABLED === 'true'
    //     ? {
    //         rejectUnauthorized:
    //           process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
    //         ca: process.env.DATABASE_CA ?? undefined,
    //         key: process.env.DATABASE_KEY ?? undefined,
    //         cert: process.env.DATABASE_CERT ?? undefined,
    //       }
    //     : undefined,
  },
} as DataSourceOptions);
