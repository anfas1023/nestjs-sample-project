import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Usersmodule } from './users/users.module';
import { postmodule } from './post/post.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-js-workout'),
    Usersmodule,
    postmodule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
