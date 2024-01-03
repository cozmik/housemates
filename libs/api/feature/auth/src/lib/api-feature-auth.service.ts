import {Injectable, NotImplementedException, UnauthorizedException} from '@nestjs/common';
import {ApiUserService} from "@housemates/api/user";
import {JwtService} from "@nestjs/jwt";
import {UserModel} from "@housemates/shared/model";
import * as bcrypt from 'bcrypt';

@Injectable()
export class ApiFeatureAuthService {
  private saltRounds = 10;

  constructor(private usersService: ApiUserService, private jwtService: JwtService) {
  }

  async register(dto: UserModel) {
    dto.password = bcrypt.hashSync(dto.password, this.saltRounds);
    return await this.usersService.register(dto);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (user) {
      const match = bcrypt.compareSync(password, user.password);
      if (match) {
        const {
          firstName, lastName, email, phoneNumber, ageRange,
          smoke, sex, profession, about, hobbies, userProfile
        } = user;
        return {
          access_token: this.jwtService.sign(user.toJSON()),
          profile: {
            firstName, lastName, email, phoneNumber, ageRange,
            smoke, sex, profession, about, hobbies, userProfile
          }
        };
      }
    } else {
      throw new UnauthorizedException({message: 'email or password not correct'});
    }
  }

  async update(token: string, body: UserModel) {
    token = token.replace('Bearer ', '');
    const userData = await this.jwtService.verify(token);
    if (userData) {
      const res = await this.usersService.update(userData, body);
      return res;
    } else {
      return new NotImplementedException();
    }
  }
}
