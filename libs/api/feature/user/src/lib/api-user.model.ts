import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema({
  timestamps: true
})
export class User {
  @Prop()
  id: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  sex: 'male' | 'female';
  @Prop()
  ageRange: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  smoke: boolean;
  @Prop()
  about: string;
  @Prop()
  profession: string;
  @Prop()
  hobbies: string[];
  @Prop()
  userProfile: string;
}

export type UserDocument = User & Document;

export const UserModel = SchemaFactory.createForClass(User);
