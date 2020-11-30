import { IsString, IsNumber, MaxLength, IsNotEmpty, IsInt, Min, Max} from 'class-validator';

export class ModelInput {

    @IsString()
    @IsNotEmpty({message: 'Name cannot be empty string'}) 
    @MaxLength(50, {
        message:'Name too long'
    })
    name: string;

    @IsInt()
    @Min(1940)
    @Max(2022)
    @IsNotEmpty()
    initial_year: number;

    @IsInt()
    @Min(1940)
    @Max(2022)
    @IsNotEmpty()
    final_year: number;
}