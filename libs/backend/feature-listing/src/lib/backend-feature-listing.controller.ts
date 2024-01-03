import {Controller, Get} from '@nestjs/common';
import {ListingService} from "@housemates/backend/data-access-listing";

@Controller('listings')
export class BackendFeatureListingController {
  constructor(private listingService: ListingService) {
  }

  @Get()
  async getAllListings() {
    return await this.listingService.getAll();
  }
}
