import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from 'src/schema/User.Schema';
import { createUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserSetting } from 'src/schema/UserSetting.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
@InjectModel(UserSetting.name) private userSettingModal:Model<UserSetting>
) {}
 async createUser({settings,...createUserDto}: createUserDto) {
    if(settings){
      const newSetting=new this.userSettingModal(settings);
      const savedSettings=await newSetting.save()

      const newUser=new this.userModel({
        ...createUserDto,
        settings:savedSettings._id
      });

      return newUser.save()
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getusers() {
    return this.userModel.find().populate('settings');
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate('settings')
  }

  updateUser(id:string,updateUser:UpdateUserDto){
return this.userModel.findByIdAndUpdate(id,updateUser)
  }

  
  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
