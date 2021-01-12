require('dotenv');

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    './src/modules/**/infra/typeorm/entities/*.ts',
    './src/modules/**/**/infra/typeorm/entities/*.ts',
    './src/modules/**/**/**/infra/typeorm/entities/*.ts',
  ],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};
