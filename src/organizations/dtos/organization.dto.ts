import { IsNotEmpty, IsEmpty, IsEmail } from "class-validator"


export class Organization {
    id? : string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    country: string;

    @IsEmpty()
    companies: [];
}