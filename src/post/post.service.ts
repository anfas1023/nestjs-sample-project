import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post } from "src/schema/post.schema";
import { CreatePostDto } from "./dto/CreatePost.dto";
import { User } from "src/schema/User.Schema";


@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Post.name) private postModel:Model<Post>,
        @InjectModel(User.name) private userModel: Model<User>,
    ){}

  async  createPost({userId,...CreatePostDto}:CreatePostDto){
    console.log(userId,CreatePostDto);
    
        const findUser = await this.userModel.findById(userId);
        if (!findUser) throw new HttpException('User Not Found', 404);
        const newPost = new this.postModel({ ...CreatePostDto, user: userId });
        const savedPost = await newPost.save();
        await findUser.updateOne({
          $push: {
            posts: savedPost._id,
          },
        });
        return savedPost;
    }

    getpostById(){}
}