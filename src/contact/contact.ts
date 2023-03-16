import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class Contact {
    
    @IsNotEmpty()
    @Length(3,25)
    name: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
}