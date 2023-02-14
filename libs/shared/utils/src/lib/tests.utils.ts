import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeORMMySqlTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [...entities],
    synchronize: true,
  });