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

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByEmailOrPseudo(emailOrPseudo: string): Promise<UserEntity> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :emailOrPseudo OR user.pseudo = :emailOrPseudo', {
        emailOrPseudo,
      })
      .getOne();
    return user;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
