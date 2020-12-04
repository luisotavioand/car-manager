import { IsString, IsNumber, MaxLength, IsNotEmpty, IsEmail} from 'class-validator';

export class BranchInput {
    
    @IsString()
    @IsNotEmpty({message: 'Name cannot be empty string'}) 
    @MaxLength(255, {
        message:'Name too long'
    })
    name: string;

    @IsString()
    @IsNotEmpty({message: 'Country cannot be empty string'}) 
    @MaxLength(40, {
        message:'Country too long'
    })
    country: string;
}