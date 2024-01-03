import { Module } from '@nestjs/common';
import {UtilityService} from "./utility.service";
// import {CloudinaryProvider} from "./cloudinary.providers";
import {CloudinaryModule, CloudinaryService} from "nestjs-cloudinary";

@Module({
  controllers: [],
  imports: [CloudinaryModule],
  providers: [UtilityService, CloudinaryService],
  exports: [UtilityService, CloudinaryService, CloudinaryModule],
})
export class ApiSharedUtilityModule {}
