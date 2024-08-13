import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class UserSetting{
    @Prop({required:false})
    reciveNotification:boolean;
    
    @Prop({required:false})
    reciveEmails?:boolean;
    
    @Prop({required:false})
    reciveSms?:boolean;
    }


    export const UserSettingSchema=SchemaFactory.createForClass(UserSetting)