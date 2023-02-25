import { BackendFeatureUserDataAccessModule } from '@akkor-hotel/backend/feature-user/data-access';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  controllers: [],
  providers: [JwtStrategy,LocalStrategy],
  exports: [],
  imports: [
    BackendFeatureUserDataAccessModule
  ],
})
export class BackendFeatureAuthentificationUtilsModule {}
