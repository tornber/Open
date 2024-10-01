import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserSettings } from "../models/UserSettings";
import { CreateUserSettingsInput } from "../inputs/CreateUserSettingsInput";
import { UserSettingService } from "src/users/userSettings.service";
import { Inject } from "@nestjs/common";

@Resolver()
export class UserSettingsResolver {
    
    constructor(private userSettingsService: UserSettingService) {}

    @Mutation(returns => UserSettings)
    async createUserSettings(@Args('createUserSettingsData') createUserSettingsData: CreateUserSettingsInput) {
        const userSettings = await this.userSettingsService.createUserSettings(createUserSettingsData)
        return userSettings
    }
}