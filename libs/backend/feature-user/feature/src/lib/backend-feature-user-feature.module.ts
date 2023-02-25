import { BackendFeatureUserDataAccessModule } from '@akkor-hotel/backend/feature-user/data-access';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { OwnedGuard, RoleGuard } from '@akkor-hotel/shared/backend/utils';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [RoleGuard, OwnedGuard, JwtService],
  exports: [],
  imports: [BackendFeatureUserDataAccessModule],
})
export class BackendFeatureUserFeatureModule {}
