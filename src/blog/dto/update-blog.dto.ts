import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {

 
  @IsString()
  title: string;

  
  @IsString()
  content: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
