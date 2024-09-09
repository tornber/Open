import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Profiles } from './typeorm/entities/Profiles';
import { Posts } from './typeorm/entities/Post';
require('dotenv').config()

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'test',
    password: process.env.PSWD,
    database: 'nestjs_sql_tutorial',
    entities: [User,Profiles,Posts],
    synchronize: true
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
