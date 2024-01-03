import {Controller, Request, Post, UseGuards, Get, Body, Put} from '@nestjs/common';
import {ApiFeatureAuthService} from './api-feature-auth.service';
import {LocalAuthGuard} from "./local-auth.guard";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {UserModel} from "@housemates/shared/model";
import {ApiTags} from "@nestjs/swagger";

@Controller('auth')
@ApiTags('Authentication')
export class ApiFeatureAuthController {
  constructor(private apiFeatureAuthService: ApiFeatureAuthService) {
  }

  @Post('login')
  async login(@Body() req) {
    return this.apiFeatureAuthService.login(req.email, req.password);
  }

  @Post('register')
  async register(@Body() user: UserModel) {
    await this.apiFeatureAuthService.register(user);
    return {message: 'Registration successful'}
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return {data: req.user, message: 'Successful'};
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async editUser(@Request() requests) {
    const {headers: {authorization}, body} = requests;
    const update = await this.apiFeatureAuthService.update(authorization, body) as UserModel;
    const {
      firstName, lastName, email, phoneNumber, ageRange,
      smoke, sex, profession, about, hobbies, userProfile
    } = update;
    return {
      data: {
        firstName, lastName, email, phoneNumber, ageRange,
        smoke, sex, profession, about, hobbies, userProfile
      }, message: 'Update Successful'
    }
  }
}
