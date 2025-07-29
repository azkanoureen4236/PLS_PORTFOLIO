import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreatePortfolioDto {


    @ApiProperty({example : 'This is the company_name of the portfolio'})
    @IsNotEmpty({message: 'company_name must be requried'})
    @IsString({message:'content must be in string'})
    c_name : string

     @ApiProperty({ type: [String], example: ['url1.jpg', 'url2.png'] })
    @IsNotEmpty({message: 'images must be requried'})
    images : string[]

    @ApiProperty({example : 'This is the description of the portfolio'})
    @IsNotEmpty({message: 'description must be requried'})
    @IsString({message:'content must be in string'})
    description: string

    @ApiProperty({example : 'This is the border of the portfolio'})
    @IsNotEmpty({message: 'border must be requried'})
    @IsString({message:'content must be in string'})
    border: string
}
