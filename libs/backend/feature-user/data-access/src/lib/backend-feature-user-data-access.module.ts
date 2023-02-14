import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';

@Module({
  controllers: [],
  providers: [UserService],
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
})
export class BackendFeatureUserDataAccessModule {}
