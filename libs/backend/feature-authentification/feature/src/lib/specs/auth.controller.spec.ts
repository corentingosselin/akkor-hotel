import axios from 'axios';
import {
  RegisterUserDto,
  SessionResponse,
} from '@akkor-hotel/shared/api-interfaces';
import {
  clearTables,
  TypeORMMySqlTestingModule,
} from '@akkor-hotel/shared/test';
import { UserEntity } from '@akkor-hotel/backend/feature-user/data-access';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

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

const mockUser: RegisterUserDto = {
  email: 'auth-test@gmail.com',
  firstName: 'auth-test',
  lastName: 'auth-test',
  password: 'Test1234!',
  confirmPassword: 'Test1234!',
  pseudo: 'auth-test',
};

describe('/auth/register (POST)', () => {
  it('should register a new user and return a 201 status code', async () => {
    const response = await axios.post<SessionResponse>(
      `/auth/register`,
      mockUser
    );
    expect(response.status).toBe(201);
    const data = response.data;
    isEqualToRegisterUserDto(data, mockUser);
  });

  it('should return a 400 status code and error message when registering with an existing email', async () => {
    let errorThrown = false;
    await axios.post(`/auth/register`, mockUser).catch((e) => {
      expect(e.response.status).toBe(400);
      expect(e.response.data.message).toBe('Email already exists');
      errorThrown = true;
    });
    expect(errorThrown).toBe(true);
  });

  it('should return a 400 status code and error message when registering with an existing username', async () => {
    const mockUser: RegisterUserDto = {
      email: 'nonexistinguser@gmail.com',
      firstName: 'test',
      lastName: 'test',
      password: 'Test1234!',
      confirmPassword: 'Test1234!',
      pseudo: 'auth-test',
    };
    let errorThrown = false;
    await axios.post<SessionResponse>(`/auth/register`, mockUser).catch((e) => {
      expect(e.response.status).toBe(400);
      expect(e.response.data.message).toBe('Pseudo already exists');
      errorThrown = true;
    });
    expect(errorThrown).toBe(true);
  });

  it('should return a 400 status code and error message when registering with invalid input', async () => {
    let errorThrown = false;
    await axios.post(`/auth/register`, mockUser).catch((e) => {
      expect(e.response.status).toBe(400);
      errorThrown = true;
    });
    expect(errorThrown).toBe(true);
  });
});

describe('/auth/login (POST)', () => {
  it('should log in a user and return an access token', async () => {
    const loginPayload = { username: 'auth-test', password: 'Test1234!' };
    const response = await axios.post<SessionResponse>(
      `/auth/login`,
      loginPayload
    );
    expect(response.status).toBe(201);
    const data = response.data;
    isEqualToRegisterUserDto(data, mockUser);
  });

  it('should return a 401 status code and error message when logging in with invalid credentials', async () => {
    const mockUser = { username: 'testuser', password: 'wrongpassword' };
    let errorThrown = false;
    await axios.post<SessionResponse>(`/auth/login`, mockUser).catch((e) => {
      expect(e.response.status).toBe(401);
      errorThrown = true;
    });
    expect(errorThrown).toBe(true);
  });
});

function isEqualToRegisterUserDto(data: SessionResponse, dto: RegisterUserDto) {
  expect(data).toHaveProperty('access_token');
  expect(data).toHaveProperty('user');
  expect(data.user).toHaveProperty('id');
  expect(data.user).toHaveProperty('created_at');
  expect(data.user).toHaveProperty('updated_at');
  expect(data.user.email).toBe(dto.email);
  expect(data.user.firstName).toBe(dto.firstName);
  expect(data.user.lastName).toBe(dto.lastName);
  expect(data.user.pseudo).toBe(dto.pseudo);
}

afterAll(async () => {
  await clearTables(dataSource);
});
