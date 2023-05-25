import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post('create')
    @UsePipes(new ValidationPipe())
    async registerUser(@Body() body: User) : Promise<{id: string}>{
        const generatedId = await this.usersService.createUser(body);

        return {id: generatedId};
    }
}
