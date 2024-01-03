import {Module} from '@nestjs/common';
import {ApiFeatureAuthController} from './api-feature-auth.controller';
import {ApiFeatureAuthService} from './api-feature-auth.service';
import {LocalStrategy} from "./local.strategy";
import {PassportModule} from "@nestjs/passport";
import {ApiUserModule} from "@housemates/api/user";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./auth-constant";
import {JwtStrategyService} from "./jwt.strategy.service";

@Module({
  controllers: [ApiFeatureAuthController],
  providers: [ApiFeatureAuthService, LocalStrategy, JwtStrategyService],
  exports: [ApiFeatureAuthService],
  imports: [
    ApiUserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ]
})
export class ApiFeatureAuthModule {}
