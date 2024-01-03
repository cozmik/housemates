import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ApiFeatureListingsModule} from "@housemates/api/feature/listings";
import {HttpModule} from "@nestjs/axios";
import {ApiFeatureStateModule} from "@housemates/api/feature/state";
import {ApiFeatureAuthModule} from "@housemates/api/feature/auth";

@Module({
  imports: [
    ApiFeatureListingsModule,
    ApiFeatureAuthModule,
    HttpModule,
    ApiFeatureStateModule,
    MongooseModule.forRoot('mongodb+srv://dev:dev-user@cluster0.vdrvjjq.mongodb.net/housemates_db?retryWrites=true&w=majority'),
  ],
  providers: [],
})
export class AppModule {}
