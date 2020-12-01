import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CarInput {

    @IsString()
    @IsNotEmpty({message: 'License plate cannot be empty string'}) 
    @MaxLength(15, {
        message:'License plate too long'
    })
    license_plate: string;
    
    @IsString()
    @IsNotEmpty({message: 'Category cannot be empty string'}) 
    @MaxLength(60, {
        message:'Category plate too long'
    })
    category: string;

    @IsString()
    @IsNotEmpty({message: 'Renavan cannot be empty string'}) 
    @MaxLength(30, {
        message:'Renavan plate too long'
    })
    renavan: string;

    @IsString()
    @IsNotEmpty({message: 'Proprietary name cannot be empty string'}) 
    @MaxLength(30, {
        message:'Proprietary name plate too long'
    })
    proprietary_name: string;

    @IsString()
    @IsNotEmpty({message: 'Proprietary document cannot be empty string'}) 
    @MaxLength(20, {
        message:'Proprietary document plate too long'
    })
    proprietary_document: string;

    @IsString()
    note: string;

    @IsString()
    @IsNotEmpty({message: 'Model(model_id) cannot be empty string'}) 
    model_id: string;

}