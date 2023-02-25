import {
  RegisterUserDto,
  UpdateUserDto,
  UserAccount,
} from '@akkor-hotel/shared/api-interfaces';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async getUserById(id: number) : Promise<UserAccount> {
    const user = await this.findOne(id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userAccount } = user;
    return userAccount;
  }


  async update(userUpdate: UpdateUserDto) {
    //check if email or pseudo already exists
    const emailExists = await this.isUserExistsByEmailOrPseudo(
      userUpdate.email
    );
    if (emailExists) {
      return new BadRequestException('Email already exists');
    }
    const pseudoExists = await this.isUserExistsByEmailOrPseudo(
      userUpdate.pseudo
    );
    if (pseudoExists) {
      return new BadRequestException('Pseudo already exists');
    }
    const result = await this.usersRepository.update(userUpdate.id, userUpdate);
    return !!result;
  }

  async findOneByEmailOrPseudo(emailOrPseudo: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :emailOrPseudo OR user.pseudo = :emailOrPseudo', {
        emailOrPseudo,
      })
      .getOne();
    return user;
  }

  async isUserExistsByEmailOrPseudo(identifier: string) {
    const user = await this.findOneByEmailOrPseudo(identifier);
    return !!user;
  }

  create(user: RegisterUserDto) {
    const userCreated = this.usersRepository.create(user);
    return this.usersRepository.save(userCreated);
  }

  async delete(id: number) {
    const result = await this.usersRepository.delete(id);
    return !!result;
  }
}