import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema({
  timestamps: true,
})
export class Listing {

  @Prop()
  userId: string;

  @Prop()
  state: any;

  @Prop()
  lga: any;

  @Prop()
  street: string;

  @Prop()
  propertyType: string;

  @Prop()
  numberOfRooms: number;

  @Prop()
  numberOfBathrooms: number;

  @Prop()
  availableRooms: number;

  @Prop()
  availableProperties: string[];

  @Prop()
  sharedRentAmount: number;

  @Prop()
  utilityBillPerMonth: number;

  @Prop()
  isRoomFurnished: boolean;

  @Prop()
  availableDate: string;

  @Prop()
  minimumStayMonths: number;

  @Prop()
  currentlyRoommateCount: number;

  @Prop()
  preferredGender: 'male' | 'female' | 'either';

  @Prop()
  preferredOccupation: string;

  @Prop()
  preferredAgeRange: string;

  @Prop()
  familyWithChildrenAllowed: boolean;

  @Prop()
  coupleAllowed: boolean;

  @Prop()
  petsAllowed: boolean;

  @Prop()
  smokingAllowed: boolean;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  photos: {thumbnail: string, main: string}[]
}

export type ListingDocument = Listing & Document;

export const ListingSchema = SchemaFactory.createForClass(Listing);
