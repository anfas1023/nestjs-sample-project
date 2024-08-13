import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "src/schema/post.schema";
import { PostsService } from "./post.service";
import { PostsCOntroler } from "./post.controller";
import { User, UserSchema } from "src/schema/User.Schema";
@Module({
    imports: [
       MongooseModule.forFeature([
        {
            name:Post.name,
            schema:PostSchema
        },
        {
            name: User.name,
            schema: UserSchema,
          },
       ]) 
    ],
    providers:[PostsService],
    controllers:[PostsCOntroler]
})

export class postmodule{}