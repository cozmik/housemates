import { Module } from '@nestjs/common';
import { BackendFeatureListingController } from './backend-feature-listing.controller';
import {BackendDataAccessListingModule} from "@housemates/backend/data-access-listing";

@Module({
  controllers: [BackendFeatureListingController],
  imports: [BackendDataAccessListingModule],
  providers: [],
  exports: [],
})
export class BackendFeatureListingModule {}
