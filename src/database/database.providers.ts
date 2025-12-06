import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST || 'db',
        port: parseInt(process.env.DB_PORT as string) || 3306,
        username: process.env.DB_USER || 'nestjs_user',
        password: process.env.DB_PASSWORD || 'nestjs_password',
        database: process.env.DB_NAME || 'nestjs_db',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
