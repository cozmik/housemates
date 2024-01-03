import {Body, Controller, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {ApiUserService} from "./api-user.service";
import {UserModel} from "@housemates/shared/model";
import {JwtAuthGuard} from "../../../auth/src/lib/jwt-auth.guard";

@Controller('users')
@ApiTags('users')
export class ApiUserController {
  constructor(private userService: ApiUserService) {
  }
  @Get()
  async getAllUsers(){
    return this.userService.getAll();
  }
  @Get(':id')
  async getUserById(@Param() payload: string){
    return this.userService.findOne(payload['id']);
  }
}
