import { Module, Post } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User } from 'src/typeorm/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profiles } from 'src/typeorm/entities/Profiles';
import { Posts } from 'src/typeorm/entities/Post';

@Module({
  imports: [TypeOrmModule.forFeature([User,Profiles,Posts])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
