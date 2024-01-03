import {Body, Controller, Get, Param, Post, Query, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {ListingService} from "./listing.service";
import {ApiTags} from "@nestjs/swagger";
import {ListingsModel, UserModel} from "@housemates/shared/model";
import {ApiUserService} from "@housemates/api/user";
import {FilesInterceptor} from "@nestjs/platform-express";
import {UtilityService} from "@housemates/api/shared/utility";

@Controller('listings')
@ApiTags('listings')
export class ApiFeatureListingsController {
  constructor(private listingService: ListingService, private utilityService: UtilityService, private userService: ApiUserService) {
  }

  @Get()
  async getAllListings(@Query() params: Record<string, string>) {
    const queryParams: {[k: string]: any} = {};
    if (params) {
      for (const queryKey of Object.keys(params)) {
        queryParams[`${queryKey}`] = `${params[queryKey]}`;
        const keys = queryParams[`${queryKey}`].split(',');
        if (keys.length > 1  ) {
            queryParams[`${queryKey}`] = {$all: queryParams[`${queryKey}`].split(',')};
          }
      }
    }

    const listings = await this.listingService.getAll(queryParams);
    return Promise.all(listings.map(async (p) => {
      const {
        id,
        state,
        lga,
        street,
        propertyType,
        numberOfRooms,
        numberOfBathrooms,
        availableRooms,
        availableProperties,
        sharedRentAmount,
        utilityBillPerMonth,
        isRoomFurnished,
        availableDate,
        minimumStayMonths,
        currentlyRoommateCount,
        preferredGender,
        preferredOccupation,
        preferredAgeRange,
        familyWithChildrenAllowed,
        coupleAllowed,
        petsAllowed,
        smokingAllowed,
        title,
        active,
        description,
        photos
      } = p;
      const user = await this.userService.findOne(p.userId);
      const {firstName, lastName, sex, profession, ageRange, userProfile} = user;
      return {
        id,
        state,
        lga,
        user: {
          id: user.id,
          firstName,
          lastName,
          sex,
          ageRange,
          profession,
          userProfile
        },
        street,
        active,
        propertyType,
        numberOfRooms,
        numberOfBathrooms,
        availableRooms,
        availableProperties,
        sharedRentAmount,
        utilityBillPerMonth,
        isRoomFurnished,
        availableDate,
        minimumStayMonths,
        currentlyRoommateCount,
        preferredGender,
        preferredOccupation,
        preferredAgeRange,
        familyWithChildrenAllowed,
        coupleAllowed,
        petsAllowed,
        smokingAllowed,
        title,
        description,
        photos
      }
    }));
  }

  @Get('stats')
  async getListingStats() {
    return this.listingService.getStats();
  }

  @Get(':id')
  async getListing(@Param() payload: string) {
    const listing = await this.listingService.getListingById(payload['id']);
      const {
        id,
        state,
        lga,
        street,
        propertyType,
        numberOfRooms,
        numberOfBathrooms,
        availableRooms,
        availableProperties,
        sharedRentAmount,
        utilityBillPerMonth,
        isRoomFurnished,
        availableDate,
        minimumStayMonths,
        currentlyRoommateCount,
        preferredGender,
        preferredOccupation,
        preferredAgeRange,
        currentRoommateCount,
        familyWithChildrenAllowed,
        coupleAllowed,
        petsAllowed,
        smokingAllowed,
        title,
        description,
        photos
      } = listing;
      const user = await this.userService.findOne(listing.userId) as UserModel;
      const {firstName, lastName, sex, profession, ageRange, userProfile} = user;
      return {
        data: {
          id,
          state,
          lga,
          user: {
            id: user.id,
            firstName,
            lastName,
            sex,
            ageRange,
            profession,
            userProfile
          },
          street,
          propertyType,
          numberOfRooms,
          currentRoommateCount,
          numberOfBathrooms,
          availableRooms,
          availableProperties,
          sharedRentAmount,
          utilityBillPerMonth,
          isRoomFurnished,
          availableDate,
          minimumStayMonths,
          currentlyRoommateCount,
          preferredGender,
          preferredOccupation,
          preferredAgeRange,
          familyWithChildrenAllowed,
          coupleAllowed,
          petsAllowed,
          smokingAllowed,
          title,
          description,
          photos
        }
      }
  }

  @Post()
  @UseInterceptors(FilesInterceptor('photos'))
  async createListing(@Body() listing: ListingsModel, @UploadedFiles() photos) {
    if (photos.length) {
      await this.utilityService.processImages(photos, 'listings').then(data => {
        listing.photos = data;
      });
    }
    return this.listingService.createListing(listing);
  }
}
