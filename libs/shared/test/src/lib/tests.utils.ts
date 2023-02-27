import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'akkor_hotel',
});
import * as argon2 from 'argon2';
import {
  RegisterUserDto,
  SessionResponse,
  UserAccount,
  UserRole,
} from '@akkor-hotel/shared/api-interfaces';

import axios from 'axios';
import { HttpClient } from '@akkor-hotel/shared/utils';

dataSource.initialize();

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

export const DEFAULT_PASSWORD = 'Test1234!';

export const createUser = async (
  dataSource: DataSource,
  user: { role: UserRole } & RegisterUserDto
): Promise<UserAccount> => {
  const password = await argon2.hash(user.password);
  const userEntity = await dataSource.getRepository('UserEntity').save({
    email: user.email,
    password,
    pseudo: user.pseudo,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  });

  return {
    id: userEntity.id,
    email: userEntity.email,
    pseudo: userEntity.pseudo,
    firstName: userEntity.firstName,
    lastName: userEntity.lastName,
    role: userEntity.role,
    created_at: userEntity.created_at,
    updated_at: userEntity.updated_at,
  };
};

export interface FakeUser {
  user: UserAccount;
  session: SessionResponse;
  client: HttpClient;
}

export const generateUser = async (
  dataSource: DataSource,
  user: { role: UserRole } & RegisterUserDto
): Promise<FakeUser> => {
  const createdUser: UserAccount = await createUser(dataSource, user);
  const response = axios.post(`/auth/login`, {
    username: createdUser.email,
    password: DEFAULT_PASSWORD,
  });

  const result = await response;
  const session = result.data as SessionResponse;

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  };
  const client = new HttpClient(axiosConfig);
  return {
    user: createdUser,
    session,
    client,
  };
};

export const createAdminUser = async (
  dataSource: DataSource,
  feature: string
) => {
  const adminUser = await generateUser(dataSource, {
    email: `${feature}-admin@gmail.com`,
    firstName: `${feature}-admin`,
    lastName: `${feature}-admin`,
    password: DEFAULT_PASSWORD,
    confirmPassword: DEFAULT_PASSWORD,
    pseudo: `${feature}-admin`,
    role: UserRole.ADMIN,
  });
  return adminUser;
};

export const createDummyUser = async (
  dataSource: DataSource,
  feature: string
) => {
  const dummyUser = await generateUser(dataSource, {
    email: `${feature}-test@gmail.com`,
    firstName: `${feature}-test`,
    lastName: `${feature}-test`,
    password: DEFAULT_PASSWORD,
    confirmPassword: DEFAULT_PASSWORD,
    pseudo: `${feature}-test`,
    role: UserRole.USER,
  });
  return dummyUser;
};

export const clearTables = async (dataSource: DataSource) => {
  const entities = dataSource.entityMetadatas;
  for (const entity of entities) {
    const repository = dataSource.getRepository(entity.name);
    await repository.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await repository.query(`TRUNCATE TABLE ${entity.tableName};`);
    await repository.query(`SET FOREIGN_KEY_CHECKS = 1;`);
  }
};

export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
