import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./api-user.model";
import {Model} from "mongoose";
import {UserModel} from "@housemates/shared/model";

@Injectable()
export class ApiUserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async getAll() {
    return await this.userModel.find().exec()
  }
  async findOne(id: string){
    return this.userModel.findById(id);
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({email});
  }

  async register(dto: UserModel) {
    const user = new this.userModel(dto);
    return await this.userModel.create(user);
  }

  async update(previousData: any, newData: UserModel) {
    console.log(previousData._id);
    return this.userModel.findByIdAndUpdate(previousData._id, newData, function (err, docs) {
      if (err){
        throw err;
      }
      else{
        return docs;
      }
    }).clone().catch(function(err){ console.log(err)});
  }
}
