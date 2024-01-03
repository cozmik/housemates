import {Gender} from "./utility.model";

export interface ListingsModel {
  id: string;
  user?: {
    id: string,
    firstName: string,
    lastName: string,
    sex: Gender,
    ageRange: string,
    profession: string,
    userProfile: string
  };
  state: string;
  lga: string;
  street: string;
  propertyType: string;
  numberOfRooms: number;
  numberOfBathrooms: number;
  availableRooms: number;
  availableProperties: string[];
  sharedRentAmount: number;
  rentCycles: number;
  utilityBillPerMonth: number;
  isRoomFurnished: boolean;
  availableDate: string;
  minimumStayMonths: number;
  currentlyRoommateCount: number;
  preferredGender: Gender | 'either';
  preferredOccupation: string;
  preferredAgeRange: string;
  familyWithChildrenAllowed: boolean;
  coupleAllowed: boolean;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  title: string;
  currentRoommateCount: { male: number, female: number},
  description: string;
  active: boolean;
  photos: { thumbnail: string, main: string }[]
}
