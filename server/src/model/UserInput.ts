import { IsString, MaxLength, IsNotEmpty, IsEmail} from 'class-validator';

export class UserInput {
    
    @IsString()
    @IsNotEmpty({message: 'Username cannot be empty string'}) 
    @MaxLength(45, {
        message:'Username too long'
    })
    username: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty({message: 'Email cannot be empty string'}) 
    @MaxLength(50, {
        message:'Email too long'
    })
    email: string;

    @IsString()
    @IsNotEmpty({message: 'Password cannot be empty string'}) 
    password: string;
}