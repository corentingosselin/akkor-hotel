import { BackendFeatureUserFeatureModule } from '@akkor-hotel/backend/feature-user/feature';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [],
  exports: [ ],
  imports: [
    BackendFeatureUserFeatureModule 
  ],
})
export class BackendFeatureUserCoreModule {}
