import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ApiFeatureAuthService} from "./api-feature-auth.service";
import {Strategy} from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: ApiFeatureAuthService) {
    super({ usernameField: 'email'});
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.login(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
