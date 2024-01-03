import {Module} from '@nestjs/common';
import {ApiFeatureListingsController} from './api-feature-listings.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Listing, ListingModel} from "./listing.model";
import {ApiUserService, User, UserModel} from "@housemates/api/user";
import {ApiSharedUtilityModule, UtilityService} from "@housemates/api/shared/utility";

@Module({
  controllers: [
    ApiFeatureListingsController
  ],
  imports: [
    ApiSharedUtilityModule,
    MongooseModule.forFeature([
      {name: Listing.name, schema: ListingModel},
      {name: User.name, schema: UserModel}
    ]),
  ],
  providers: [ApiUserService, UtilityService, ApiUserService],
  exports: [],
})
export class ApiFeatureListingsModule {
}
