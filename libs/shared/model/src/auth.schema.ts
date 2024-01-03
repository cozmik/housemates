import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {UserModel} from "./model/src";

export type UserDocument = HydratedDocument<UserModel>;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop({isRequired: true})
  firstName: string;

  @Prop({isRequired: true})
  lastName: string;

  @Prop({isRequired: true})
  email: string;

  @Prop()
  sex: 'Male' | 'Female';

  @Prop()
  age_rage: string;

  @Prop()
  smoke: boolean;

  @Prop()
  about: string;

  @Prop([String])
  hobbies: string[];

  @Prop()
  userProfile: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
