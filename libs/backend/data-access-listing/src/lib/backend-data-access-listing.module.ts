import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Listing, ListingSchema} from "./listing.schema";
import {ListingService} from "./listing.service";

@Module({
  imports: [MongooseModule.forFeature([
    {name: Listing.name, schema: ListingSchema}
  ])],
  providers: [ListingService],
  exports: [ListingService],
})
export class BackendDataAccessListingModule {}
