import { Module } from '@nestjs/common';
import { UserResolver } from './UserResolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSettings } from 'src/graphql/models/UserSettings';
import { UserSettingService } from './userSettings.service';
import { UserSettingsResolver } from 'src/graphql/resolvers/UserSettingsResolver';

@Module({
    imports: [TypeOrmModule.forFeature([User,UserSettings])],
    providers: [UserResolver,UserService,UserSettingService,UserSettingsResolver]
})
export class UsersModule {}
