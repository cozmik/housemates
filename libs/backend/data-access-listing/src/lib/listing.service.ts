import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Listing, ListingDocument} from "./listing.schema";
import {Model} from "mongoose";

@Injectable()
export class ListingService {
  constructor(@InjectModel(Listing.name) private listings: Model<ListingDocument>) {
  }

  async getAll() {
    return await this.listings.find().exec()
  }
}
