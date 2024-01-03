import { Module } from '@nestjs/common';
import {ApiUserService} from "./api-user.service";
import {ApiUserController} from "./api-user.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserModel} from "./api-user.model";

@Module({
  controllers: [ApiUserController],
  providers: [ApiUserService],
  exports: [ApiUserService],
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserModel}
    ]),
  ]
})
export class ApiUserModule {}
