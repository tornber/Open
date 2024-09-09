import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateProfileDto } from 'src/users/dtos/CreateProfile.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { CreatePostDto } from 'src/utils/types';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    async getUsers() {
        const users = this.usersService.findUsers()
        return users
    }

    @Post()
    createUser(@Body() createUserDto : CreateUserDto ) {
        const { confirmPassword, ...userDetails} = createUserDto
        return this.usersService.createUser(userDetails)
    }

    @Put(':id')
    async updateUserById(@Param('id',ParseIntPipe) id : number,@Body() updateUserDto : UpdateUserDto) {
        await this.usersService.updateUserById(id,updateUserDto)
    }

    @Delete(':id')
    async deleteUserById(@Param('id',ParseIntPipe) id : number) {
        return  this.usersService.deletUserById(id)
    } 

    @Post(':id/profiles')
    createUserProfile(@Param('id',ParseIntPipe) id : number,@Body() userProfile : CreateProfileDto) {

        this.usersService.createUserProfile(id,userProfile)

    }

    @Post(':id/posts')
    createUserPost(@Param('id',ParseIntPipe) id : number, @Body() createPostDto : CreatePostDto) {
        
    }



}
