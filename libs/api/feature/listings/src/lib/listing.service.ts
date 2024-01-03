import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Listing, ListingDocument} from "./listing.model";
import {ListingsModel} from "@housemates/shared/model";

@Injectable()
export class ListingService {
  constructor(@InjectModel(Listing.name) private listingModel: Model<ListingDocument>) {
  }

  async getAll(params: Record<string, string>) {
    let parameters: {[k: string]: any} = {};
    if (params) {
      parameters = params;
    }
    return await this.listingModel.find(parameters).exec();
  }

  async createListing(dto: ListingsModel) {
    const listing = new this.listingModel(dto);
    return await this.listingModel.create(listing);
  }

  async getListingById(listingId: string) {
    return this.listingModel.findById(listingId);
  }

  async getStats() {
    const active = await this.listingModel.count({active: true});
    const inactive = await this.listingModel.count({active: false});
     return {status: 'success', data:{active, inactive}};
  }
}
