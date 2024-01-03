import { Module } from '@nestjs/common';
import {StateController} from "./state.controller";
import {StateService} from "./state.service";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [
    HttpModule
  ],
  controllers: [StateController],
  providers: [StateService],
  exports: [],
})
export class ApiFeatureStateModule {}
