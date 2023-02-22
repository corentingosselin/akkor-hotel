import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const  dataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'akkor_hotel',
});

export const TypeORMMySqlTestingModule = (entities: any[]) =>
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'akkor_hotel',
      entities: [...entities],
      synchronize: true,
      autoLoadEntities: true,
    }),
    dataSourceFactory: async (options) => {
      if (options) {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      }
      return dataSource;
    },
  });

export const clearTables = async (dataSource: DataSource) => {
  const entities = dataSource.entityMetadatas;
  for (const entity of entities) {
    const repository = dataSource.getRepository(entity.name);
    await repository.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await repository.query(`TRUNCATE TABLE ${entity.tableName};`);
    await repository.query(`SET FOREIGN_KEY_CHECKS = 1;`);
  }
};


