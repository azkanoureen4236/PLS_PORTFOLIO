import { ApiProperty } from "@nestjs/swagger";
import { IsOptional,IsString } from "class-validator";

export class UserDto {

    @IsOptional()
    @IsString()
     @ApiProperty({example : 'admin'})
    name?:string;
    
     @IsOptional()
  @IsString()
   @ApiProperty({example : 'abc@de'})
    password:string

     @IsString()
 @ApiProperty({example : 'abc@gmail.com'})
    email:string
}
