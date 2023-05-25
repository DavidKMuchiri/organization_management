import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './dtos/user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    async createUser(body: User) : Promise<string>{
        const newUser = new this.userModel(body);
        let results: any;
        const existingUser = await this.userModel.findOne({email: body.email});
        if(!existingUser){
            results = await newUser.save();
        }else{
            throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST);
        }

        return results.id as string;
    }

    async findUser(email: string){
        let user: User;
        try {
            user = await this.userModel.findOne({email: email});
        } catch (error) {
            throw new HttpException("No such user", HttpStatus.NOT_FOUND);
        }

        if(!user){
            throw new HttpException("No such user", HttpStatus.NOT_FOUND);
        }else{
            return user;
        }
    }
    
}
