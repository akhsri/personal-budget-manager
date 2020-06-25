import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserSigninDto } from './dto/user-signin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async signUp(userSignupDto: UserSignupDto): Promise<void> {
        return this.userRepository.signUp(userSignupDto);
    }

    async signIn(userSigninDto: UserSigninDto): Promise<{ accessToken: string }> {
        const email = await this.userRepository.validateUserPassword(userSigninDto);
        console.log(email);
        if (!email) {
            throw new UnauthorizedException('Invalid credentials')
        }
        const payload: JwtPayload = { email };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }



}
