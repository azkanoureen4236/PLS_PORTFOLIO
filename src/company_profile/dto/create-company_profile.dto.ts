import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCompanyProfileDto {
    
       @ApiProperty({ type: [String], example: ['url1.jpg', 'url2.png'] })
        @IsNotEmpty({message: 'logo must be requried'})
        @IsString({message:'logo must be in string'})
        logo : string
}
