import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"


export class CreateBlogDto {
@ApiProperty({example : 'My first blog'})
@IsNotEmpty({message: 'title must be requried'})
@IsString({message:'title must be i string'})

title: string

@ApiProperty({example : 'This is the content of the blog'})
@IsNotEmpty({message: 'content must be requried'})
@IsString({message:'content must be i string'})
content: string
  

}

