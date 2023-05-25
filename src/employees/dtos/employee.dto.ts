import { IsNotEmpty, IsEmail } from "class-validator"

export class Employee{
    id? : string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    companyId: string;

}