import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {User,UserSchema} from 'src/schema/User.Schema'
import { UsersService } from "./user.service";
import { UserController } from "./user.controller";
import { UserSetting, UserSettingSchema } from "src/schema/UserSetting.schema";
@Module({
    imports: [
       MongooseModule.forFeature([
        {
            name:User.name,
            schema:UserSchema
        },
        {
            name:UserSetting.name,
            schema:UserSettingSchema
        }
       ]) 
    ],
    providers:[UsersService],
    controllers:[UserController]
})

export class Usersmodule{}