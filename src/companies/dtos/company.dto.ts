import { IsNotEmpty, IsEmpty, IsEmail } from "class-validator"

export class Company{
    id? : string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    organizationId: string;

    @IsEmpty()
    employees: [];
}