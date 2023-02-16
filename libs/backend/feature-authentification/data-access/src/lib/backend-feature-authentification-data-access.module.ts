import { BackendFeatureUserDataAccessModule } from '@akkor-hotel/backend/feature-user/data-access';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy, LocalStrategy} from '@akkor-hotel/backend/feature-authentification/utils';

@Module({
  controllers: [],
  providers: [AuthService, LocalStrategy, JwtStrategy],
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

    forwardRef(() => BackendFeatureUserDataAccessModule),

  ],
})
export class BackendFeatureAuthentificationDataAccessModule {}
