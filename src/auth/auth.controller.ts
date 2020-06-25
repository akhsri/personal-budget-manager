import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserSigninDto } from './dto/user-signin.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {

    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) userSignupDto: UserSignupDto): Promise<void> {
        return this.authService.signUp(userSignupDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) userSigninDto: UserSigninDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(userSigninDto);
    }
}
