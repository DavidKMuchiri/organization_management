import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService){}

    async signIn(email: string, pass: string){
        const user = await this.usersService.findUser(email);

        if(!user || user.password !== pass){
            throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST);
        }

        const payload = { sub: user.id, username: user.email};

        return {
            access_token: await this.jwtService.signAsync(payload),
        };

    }
}
