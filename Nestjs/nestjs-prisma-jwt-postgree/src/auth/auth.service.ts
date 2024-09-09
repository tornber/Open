import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { isInstance } from "class-validator";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { strict } from "assert";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {

    constructor(private prisma: PrismaService,private jwt: JwtService,private config: ConfigService) {}

    async signUp(dto: AuthDto) {
        const hash = await argon.hash(dto.password)

        try {

            const newUser = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash
                }
                // select: {
                //     id: true,
                //     email: true,
                //     createdAt: true
                // }
    
            })
            return this.signToken(newUser.id,newUser.email)
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new ForbiddenException("credentials taken")
                }
            }
            throw error
        }

    }

    async login(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({where: {email: dto.email}})
        if (!user) throw new ForbiddenException("Credentials is incorrect")

        const passwordHash = await argon.verify(user.hash,dto.password)
        if (!passwordHash) {
            throw new ForbiddenException("password is incorrect")
        }

        return this.signToken(user.id,user.email)
    }

    signToken(userId: number, email: string) : {access_token: Promise<string>}{
        const payload = {
            sub: userId,
            email
        }

        const token = this.jwt.signAsync(payload,{
            expiresIn: '15m',
            secret: this.config.get("JWT_SECRET")
        })

        return {access_token: token}
    }

}