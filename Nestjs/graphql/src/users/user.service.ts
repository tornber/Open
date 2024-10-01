import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createUserInput } from "src/graphql/inputs/CreateUserInput";
import { User } from "src/graphql/models/User";
import { Repository } from "typeorm";


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    getUserById(id: number) {
        return this.userRepository.findOneBy({id})
    }

    getUsers() {
        return this.userRepository.find()
    }

    createUser(createUserData: createUserInput) {
        const newUser = this.userRepository.create(createUserData)
        return this.userRepository.save(newUser)
    }

}