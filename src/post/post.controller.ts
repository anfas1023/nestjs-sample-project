import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { PostsService } from "./post.service";
import { CreatePostDto } from "./dto/CreatePost.dto";



@Controller('posts')
export class PostsCOntroler {
constructor(private PostsService:PostsService){}

@Post()
@UsePipes(new ValidationPipe())
createPost(@Body() createPostDto:CreatePostDto){
return this.PostsService.createPost(createPostDto)
}
}