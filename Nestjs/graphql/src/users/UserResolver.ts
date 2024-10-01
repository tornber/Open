import { Resolver, Query, Args, Int, ResolveField, Parent, Mutation } from "@nestjs/graphql";
import { User } from "../models/User";
import { UserSettings } from "../models/UserSettings";
import { createUserInput } from "../inputs/CreateUserInput";
import { UserService } from "./user.service";
import { Inject } from "@nestjs/common";
import { UserSettingService } from "./userSettings.service";

@Resolver(of => User)
export class UserResolver {

    constructor(@Inject(UserService) private userServiece: UserService, 
        private usereSettingsService: UserSettingService) {}

    @Query(returns => User,{nullable: true,name: 'userById'})
    getUserById(@Args('id', {type: () => Int,nullable: false}) id: number) {
        return this.userServiece.getUserById(id)
    }

    @Query(() => [User])
    getUsers() {
        return this.userServiece.getUsers()
    }

    @ResolveField(returns => UserSettings,{name: 'settings',nullable: true})
    getUserSettings(@Parent() user: User) {
        return this.usereSettingsService.getUserSettingsById(user.id)
    }

    @Mutation(returns => User)
    createUser(@Args('createUserData') createUserData: createUserInput) {
        return this.userServiece.createUser(createUserData)
    }
}