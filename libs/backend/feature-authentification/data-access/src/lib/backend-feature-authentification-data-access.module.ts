import { BackendFeatureUserDataAccessModule } from '@akkor-hotel/backend/feature-user/data-access';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30mn' },
    }),
    forwardRef(() => BackendFeatureUserDataAccessModule),

  ],
})
export class BackendFeatureAuthentificationDataAccessModule {}
