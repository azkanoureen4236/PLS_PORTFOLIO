import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, Matches, MinLength } from 'class-validator';
export class SignupDto {
  @IsNotEmpty({ message: 'email is requried'})
  @IsEmail({}, { message: 'Invalid email format' })
  @ApiProperty({example : 'admin@gmail.com'})
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: 'Password must include at least one special character',
  })
   @ApiProperty({example : '@dmin'})
  password: string;

  @IsNotEmpty({ message: 'Name is required' })
  @ApiProperty({example : 'admin'})
  name: string;

  
}
