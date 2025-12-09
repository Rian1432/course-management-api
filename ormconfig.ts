// ormconfig.ts

import { DataSource, DataSourceOptions } from 'typeorm';

const options: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'db',
  port: parseInt(process.env.DB_PORT as string) || 3306,
  username: process.env.DB_USER || 'nestjs_user',
  password: process.env.DB_PASSWORD || 'nestjs_password',
  database: process.env.DB_NAME || 'nestjs_db',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  synchronize: false,
};

export const AppDataSource = new DataSource(options);
