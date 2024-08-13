import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { createUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: createUserDto) {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }       

  @Get('getUsers')
  getUsers() {
    return this.userService.getusers();
  }

  @Get('/getusers/:id')
  async getUserById(@Param('id') id:string){
    const isValid=mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('user not found',404)
    const finduser=await this.userService.getUserById(id)
    if(!finduser) throw new HttpException('Usr not found',404);
    return finduser
  }


  @Patch('/updateUser/:id')
  @UsePipes(new ValidationPipe())
  async updateUser(@Param('id') id:string,@Body() updateUser:UpdateUserDto){
    const isValid=mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('invalid id',400)
        const updatedUser = await this.userService.updateUser(id, updateUser);
    if (!updatedUser) throw new HttpException('User Not Found', 404);
    return updatedUser;
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) throw new HttpException('User Not Found', 404);
    return;
  }
}
