import { UserEntity } from '../entities/user.entity';
import { Test } from '@nestjs/testing';
import {
  clearTables,
  TypeORMMySqlTestingModule,
} from '@akkor-hotel/shared/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../services/user.service';
import { DataSource } from 'typeorm';
import { RegisterUserDto } from '@akkor-hotel/shared/api-interfaces';
import * as argon2 from 'argon2';

const registerDto: RegisterUserDto = {
  email: 'test@gmail.com',
  password: 'test',
  confirmPassword: 'test',
  pseudo: 'test',
  firstName: 'testName',
  lastName: 'testName',
};

const { confirmPassword, ...expectedUser } = registerDto;

let createdUser: UserEntity;
let service: UserService;
let dataSource: DataSource;
beforeAll(async () => {
  const module =  await Test.createTestingModule({
    imports: [
      TypeORMMySqlTestingModule([UserEntity]),
      TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [UserService],
  }).compile();

  dataSource = module.get<DataSource>(DataSource);
  service = module.get<UserService>(UserService);
});

describe('UserService', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(dataSource).toBeDefined();
  });

  it('should create user', async () => {
    createdUser = await service.create(registerDto);

    expect(createdUser).toBeDefined();
    expect(createdUser.updated_at).toBeDefined();
    expect(createdUser.created_at).toBeDefined();

    expect(createdUser.email).toEqual(expectedUser.email);
    expect(
      argon2.verify(createdUser.password, expectedUser.password)
    ).toBeTruthy();
    expect(createdUser.pseudo).toEqual(expectedUser.pseudo);
    expect(createdUser.firstName).toEqual(expectedUser.firstName);
    expect(createdUser.lastName).toEqual(expectedUser.lastName);
  });

  it('should find user by id', async () => {
    const foundUser = await service.findOne(createdUser.id);
    expect(foundUser).toBeDefined();
    expect(createdUser).toEqual(foundUser);
  });

  it('should find user by email', async () => {
    const foundUser = await service.findOneByEmailOrPseudo(createdUser.email);
    expect(foundUser).toBeDefined();
    expect(createdUser).toEqual(foundUser);
  });

  it('should find user by pseudo', async () => {
    const foundUser = await service.findOneByEmailOrPseudo(createdUser.pseudo);
    expect(foundUser).toBeDefined();
    expect(createdUser).toEqual(foundUser);
  });

  it('should find all users', async () => {
    const foundUsers = await service.findAll();
    expect(foundUsers.length).toBeGreaterThan(0);
    expect(foundUsers[0]).toBeDefined();
    expect(createdUser).toEqual(foundUsers[0]);
  });

  it('should return true if email exists in user dataset', async () => {
    const userExists = await service.isUserExistsByEmailOrPseudo(
      createdUser.email
    );
    expect(userExists).toBeTruthy();
  });

  it('should return true if pseudo exists in user dataset', async () => {
    const userExists = await service.isUserExistsByEmailOrPseudo(
      createdUser.pseudo
    );
    expect(userExists).toBeTruthy();
  });


  it('should remove user', () => {
    const removeResult = service.delete(createdUser.id);
    removeResult.then(async () => {
      const foundUser = await service.findOne(createdUser.id);
      expect(foundUser).toBeNull();
    });
  });


  it('should return false if user does not exist', async () => {
    const userExists = await service.isUserExistsByEmailOrPseudo(
      'notExistingUser'
    );
    expect(userExists).toBeFalsy();
  });
});

afterAll(async () => {
  //clear tables with typeorm
  clearTables(dataSource);
});
