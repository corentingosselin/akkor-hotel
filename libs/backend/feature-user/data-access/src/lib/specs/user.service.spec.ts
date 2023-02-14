import { UserEntity } from '../entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeORMMySqlTestingModule } from '@akkor-hotel/shared/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../services/user.service';

const user: UserEntity = {
  id: 1,
  email: 'email',
  password: 'password',
  pseudo: 'pseudo',
  firstName: 'firstName',
  lastName: 'lastName',
  updated_at: new Date(),
  created_at: new Date(),
};

let createdUser: UserEntity;
let service: UserService;
beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      TypeORMMySqlTestingModule([UserEntity]),
      TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [UserService],
  }).compile();

   service = module.get<UserService>(UserService);
});


describe('UserService', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  
    it('should create user', async () => {
      createdUser = await service.create(user);
      expect(createdUser).toBeDefined();
      expect(createdUser.id).toEqual(user.id);
      expect(createdUser.email).toEqual(user.email);
      // expect(createdUser.password).toEqual(user.password); TODO crypted password
      expect(createdUser.pseudo).toEqual(user.pseudo);
      expect(createdUser.firstName).toEqual(user.firstName);
      expect(createdUser.lastName).toEqual(user.lastName);
    });
  
    it('should find user by id', async () => {
      const foundUser = await service.findOne(user.id);
      expect(foundUser).toBeDefined();
      expect(createdUser).toEqual(foundUser);
    });
  
    it('should find user by email', async () => {
      const foundUser = await service.findOneByEmailOrPseudo(user.email);
      expect(foundUser).toBeDefined();
      expect(createdUser).toEqual(foundUser);
    });
  
    it('should find user by pseudo', async () => {
      const foundUser = await service.findOneByEmailOrPseudo(user.pseudo);
      expect(foundUser).toBeDefined();
      expect(createdUser).toEqual(foundUser);
    });
  
    it('should find all users', async () => {
      const foundUsers = await service.findAll();
      expect(foundUsers.length).toBeGreaterThan(0);
      expect(foundUsers[0]).toBeDefined();
      expect(createdUser).toEqual(foundUsers[0]);
    });
  
    it('should remove user', async () => {
      await service.remove(createdUser.id);
      const foundUser = await service.findOne(createdUser.id);
      expect(foundUser).toBeUndefined();
    });
  });
  


