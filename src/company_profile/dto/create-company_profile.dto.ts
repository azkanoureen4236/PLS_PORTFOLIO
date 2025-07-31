import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyProfileDto {
  @IsNotEmpty({ message: 'logo must be requried' })
  @IsString({ message: 'logo must be in string' })
  logo: string;
}
