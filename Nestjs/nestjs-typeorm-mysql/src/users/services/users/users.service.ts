import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/typeorm/entities/Post';
import { Profiles } from 'src/typeorm/entities/Profiles';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams, UserPostParams, UserProfileParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profiles) profileRepository : Repository<Profiles>,
        @InjectRepository(Posts) postRepository : Repository<Posts>
    ) {}

    findUsers() {
        return this.userRepository.find({relations: ['profile']})
    }

    createUser(userDeatails: CreateUserParams) {
        const newUser = this.userRepository.create({...userDeatails, createdAt: new Date()})
        return this.userRepository.save(newUser)
    }

    updateUserById(id: number, userDeatails: UpdateUserParams) {
        return this.userRepository.update({id}, {...userDeatails})
    }

    deletUserById(id : number) {
        return this.userRepository.delete({id})
    }

    async createUserProfile(id : number, userProfile : UserProfileParams) {
        const user = await this.userRepository.findOneBy({id})
        if (!user) {
            throw new HttpException("there is not user with this id",HttpStatus.BAD_REQUEST)
        }
        const newProfile = await this.profileRepository.create(userProfile)
        const savedProfile =  await this.profileRepository.save(newProfile)
        user.profile = savedProfile
        const updatedUser = await this.userRepository.save(user)
        return updatedUser
    }

    async createUserPost(id : number, userPostDetails: UserPostParams) {
        const user = await this.userRepository.findOneBy({id})
        if (!user) {
            throw new HttpException('there is not user with this id',HttpStatus.BAD_REQUEST)
        }
        const newPost = this.postRepository.create({...userPostDetails,user})
        return this.postRepository.save(newPost)
    }  

}
