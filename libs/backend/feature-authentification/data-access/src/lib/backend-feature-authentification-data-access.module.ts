import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { BackendFeatureAuthentificationUtilsModule } from '@akkor-hotel/backend/feature-authentification/utils';
import { BackendFeatureUserDataAccessModule } from '@akkor-hotel/backend/feature-user/data-access';

@Module({
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
    BackendFeatureAuthentificationUtilsModule,
    BackendFeatureUserDataAccessModule
  ],
})
export class BackendFeatureAuthentificationDataAccessModule {}
