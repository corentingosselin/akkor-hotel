import { RegisterUserDto } from '@akkor-hotel/shared/api-interfaces';
import { Injectable } from '@nestjs/common';
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

  async findOneByEmailOrPseudo(emailOrPseudo: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :emailOrPseudo OR user.pseudo = :emailOrPseudo', {
        emailOrPseudo,
      })
      .getOne();
    return user;
  }

  async isUserExistsByEmailOrPesudo(identifier: string) {
    return this.findOneByEmailOrPseudo(identifier) !== null;
  }

  create(user: RegisterUserDto) {
    const userCreated = this.usersRepository.create(user);
    return this.usersRepository.save(userCreated);
  }

  remove(id: number) {
    this.usersRepository.delete(id);
  }
}
