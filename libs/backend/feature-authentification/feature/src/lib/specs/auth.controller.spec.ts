import axios from 'axios';
import {
  RegisterUserDto,
  SessionResponse,
} from '@akkor-hotel/shared/api-interfaces';
import {
  clearTables,
  TypeORMMySqlTestingModule,
} from '@akkor-hotel/shared/utils';
import { UserEntity } from '@akkor-hotel/backend/feature-user/data-access';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Test } from '@nestjs/testing';

let dataSource: DataSource;
beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      TypeORMMySqlTestingModule([UserEntity]),
      TypeOrmModule.forFeature([UserEntity]),
    ],
  }).compile();

  dataSource = module.get<DataSource>(DataSource);
});

describe('/auth/register (POST)', () => {
  it('should register a new user and return a 201 status code', async () => {
    const mockUser: RegisterUserDto = {
      email: 'test@gmail.com',
      firstName: 'test',
      lastName: 'test',
      password: 'Test1234!',
      confirmPassword: 'Test1234!',
      pseudo: 'test',
    };

    const response = await axios.post(`/auth/register`, mockUser);
    expect(response.status).toBe(201);
    //expect access token with sessionResponse
    // expect(response.body).toHaveProperty('userId');
  });

  it('should return a 400 status code and error message when registering with invalid input', async () => {
    const mockUser: RegisterUserDto = {
      email: 'test',
      firstName: 'test',
      lastName: 'test',
      password: 'password',
      confirmPassword: 'password',
      pseudo: 'testuser',
    };

    await axios.post(`/auth/register`, mockUser).catch((e) => {
      expect(e.response.status).toBe(400);
    });

    //expect(response.status).toBe(400);
    //expect(response.body.message).toBe('Bad Request Exception');
  });
});

describe('/auth/login (POST)', () => {
  it('should log in a user and return an access token', async () => {
    const mockUser = { username: 'test', password: 'Test1234!' };
    const mockResult: SessionResponse = {
      access_token: 'mocktoken',
      user: {
        id: 0,
        pseudo: 'test',
        email: 'test@gmail.com',
        firstName: 'test',
        lastName: 'test',
        created_at: new Date(),
        updated_at: new Date(),
      },
    };

    const response = await axios.post(`/auth/login`, mockUser);
    expect(response.status).toBe(201);
    /* expect(response.body).toMatchObject({
        access_token: 'mocktoken',
        user: {
          id: '123',
          username: 'testuser',
          email: 'testuser@test.com',
          firstName: 'Test',
          lastName: 'User',
        },
      });*/
  });

  it('should return a 401 status code and error message when logging in with invalid credentials', async () => {
    const mockUser = { username: 'testuser', password: 'wrongpassword' };

    //jest.spyOn(authService, 'login').mockResolvedValue(null);

    await axios.post(`/auth/login`, mockUser).catch((e) => {
      expect(e.response.status).toBe(401);
    });

    //expect(response.body.message).toBe('Unauthorized');
  });
});

afterAll(async () => {
  clearTables(dataSource);
});
