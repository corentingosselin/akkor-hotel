import {
  BackendFeatureAuthentificationDataAccessModule,
} from '@akkor-hotel/backend/feature-authentification/data-access';
import { BackendFeatureAuthentificationUtilsModule } from '@akkor-hotel/backend/feature-authentification/utils';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [],
  exports: [],
  imports: [
    BackendFeatureAuthentificationDataAccessModule,
    BackendFeatureAuthentificationUtilsModule,
  ],
})
export class BackendFeatureAuthentificationFeatureModule {}
