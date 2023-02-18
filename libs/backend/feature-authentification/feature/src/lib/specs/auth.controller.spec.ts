import axios from 'axios';
import {
  RegisterUserDto,
  SessionResponse,
} from '@akkor-hotel/shared/api-interfaces';
import { clearTables, clearTablesFromEntities, dataSource } from '@akkor-hotel/shared/utils';
import { UserEntity } from 'libs/backend/feature-user/data-access/src/lib/entities/user.entity';

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

    axios
      .post(`/auth/register`, mockUser)
      .then((response) => {
        console.log('============================ response ', response);
      })
      .catch((error) => {
        console.log('============================ error ', error);
      });

    //expect(response.status).toBe(201);

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

    const response = await axios.post(`/auth/register`);
    expect(response.status).toBe(400);

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

    const response = await axios.post(`/auth/login`);

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

    const response = await axios.post(`/auth/login`);

    //expect(response.body.message).toBe('Unauthorized');
  });
});

afterAll(async () => {
  //clear tables with typeorm
  clearTablesFromEntities(dataSource, [UserEntity]);
});
