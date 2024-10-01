import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql'
import { join } from 'path';
import { UserSettingsResolver } from './graphql/resolvers/UserSettingsResolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './graphql/models/User';
import { ConfigModule } from '@nestjs/config';
import { UserSettings } from './graphql/models/UserSettings';
import { UsersModule } from './users/users.module';
ConfigModule.forRoot()

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(),'src/schema.gql')
  }), TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'graphqlTutorial',
    entities: [User,UserSettings],
    synchronize: true
  }), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
