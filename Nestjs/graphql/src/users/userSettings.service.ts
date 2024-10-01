import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserSettingsInput } from "src/graphql/inputs/CreateUserSettingsInput";
import { User } from "src/graphql/models/User";
import { UserSettings } from "src/graphql/models/UserSettings";
import { Repository } from "typeorm";


@Injectable() 
export class UserSettingService {

    constructor(@InjectRepository(UserSettings) private userSettingsRepository: Repository<UserSettings>,
    @InjectRepository(User) private userRepository: Repository<User>) {}

    getUserSettingsById(id: number) {
        return this.userSettingsRepository.findOneBy({userId: id})
    }
    
    async createUserSettings(createUserSettingsData: CreateUserSettingsInput) {
        const user = await this.userRepository.findOneBy({id: createUserSettingsData.userId})
        if (!user) throw new Error("user not found")
        const newUserSettings = this.userSettingsRepository.create(createUserSettingsData)
        const savedSettings = await  this.userSettingsRepository.save(newUserSettings)
        user.settings = savedSettings
        await this.userRepository.save(user)
        return savedSettings
    }
}