import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { UserSignupDto } from "./dto/user-signup.dto";
import * as bcrypt from 'bcryptjs';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { UserSigninDto } from "./dto/user-signin.dto";


@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(userSignupDto: UserSignupDto) {
        const { firstName, lastName, email, password } = userSignupDto;
        const salt = await bcrypt.genSalt()
        const user = new User()
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.salt = salt;
        user.password = await this.hashPassword(password, salt);
        try {
            await user.save()
        } catch (error) {

            if (error.code === '23505') {
                throw new ConflictException('User already exists')
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

    async validateUserPassword(userSigninDto: UserSigninDto): Promise<string> {
        const { email, password } = userSigninDto;
        const user = await this.findOne({ email });
        if (user && await user.validatePassword(password)) {
            return user.email;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}