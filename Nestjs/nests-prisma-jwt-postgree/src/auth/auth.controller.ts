import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";


@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService) {}

    @Post('signup')
    signUp(@Body() dto: AuthDto, @Body('password') password: string, @Req() req: Request) {
        return this.authService.signUp(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin') 
    signIn(@Body() dto: AuthDto) {
        return this.authService.login(dto)
    }

}