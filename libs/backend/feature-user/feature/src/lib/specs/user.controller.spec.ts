import { UserEntity } from '@akkor-hotel/backend/feature-user/data-access';
import { SessionResponse } from '@akkor-hotel/shared/api-interfaces';
import {
  clearTables,
  createAdminUser,
  createDummyUser,
  FakeUser,
  TypeORMMySqlTestingModule,
} from '@akkor-hotel/shared/test';
import { HttpMethod } from '@akkor-hotel/shared/utils';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

let adminUser: FakeUser;
let dummyUser: FakeUser;

let dataSource: DataSource;
beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      TypeORMMySqlTestingModule([UserEntity]),
      TypeOrmModule.forFeature([UserEntity]),
    ],
  }).compile();

  dataSource = module.get<DataSource>(DataSource);

  adminUser = await createAdminUser(dataSource);
  dummyUser = await createDummyUser(dataSource);
});

describe('/user (GET)', () => {
  it('admin should be able to get user', async () => {
    const response = await adminUser.client.sendRequest(
      HttpMethod.GET,
      `/user/${dummyUser.user.id}`
    );
    const sessionResponse = response.data as SessionResponse;
    expect(response.status).toBe(200);
    expect(sessionResponse).toStrictEqual(dummyUser.session.user);
  });

  it('admin should not get non existing user', async () => {
    await adminUser.client.sendRequest(HttpMethod.GET, `/user/0`).catch((e) => {
      expect(e.response.status).toBe(404);
      expect(e.response.data.message).toBe('User not found');
    });
  });
});

describe('/user (UPDATE)', () => {
  it('admin should be able to update user', async () => {
    const response = await adminUser.client.sendRequest(
      HttpMethod.PUT,
      `/user`,
      {
        id: dummyUser.user.id,
        email: 'updatedTest@gmail.com',
        firstName: 'updatedTest',
        lastName: 'updatedTest',
        pseudo: 'updatedTest',
      }
    );
    expect(response.status).toBe(200);
    expect(response.data).toBe(true);

    const userResponse = await adminUser.client.sendRequest(
      HttpMethod.GET,
      `/user/${dummyUser.user.id}`
    );
    expect(userResponse.status).toBe(200);
    expect(userResponse.data.email).toBe('updatedTest@gmail.com');
    expect(userResponse.data.firstName).toBe('updatedTest');
    expect(userResponse.data.lastName).toBe('updatedTest');
    expect(userResponse.data.pseudo).toBe('updatedTest');
  });
});

describe('/user (DELETE)', () => {
  it('user should be able to delete its own account', async () => {
    const response = await dummyUser.client.sendRequest(
      HttpMethod.DELETE,
      `/user/${dummyUser.user.id}`
    );
    expect(response.status).toBe(200);
    expect(response.data).toBe(true);

    await adminUser.client
      .sendRequest(HttpMethod.GET, `/user/${dummyUser.user.id}`)
      .catch((e) => {
        expect(e.response.status).toBe(404);
      });
  });
});

afterAll(async () => {
  await clearTables(dataSource);
});
