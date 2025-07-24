import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Blogs')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}


  @Post('create')
  createBlog(@Req() req, @Body() createBlogDto: CreateBlogDto) {
    console.log('errrrorrrr is here', req.user.id)
    const userId = req.user.id;
    return this.blogService.createBlog(createBlogDto, userId);
  }
  // @Get()
  // fingAllBlog() {
  //   return this.blogService.fingAllBlog();
  // }

  // @Get(':id')
  // findOneBlog(@Param('id') id: number) {
  //   return this.blogService.findOneBlog(id);
  // }

  // @Patch(':id')
  // updateBlog(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
  //   return this.blogService.updateBlog(id, updateBlogDto);
  // }

  // @Delete(':id')
  // removeBlog(@Param('id') id: number) {
  //   return this.blogService.removeBlog(id);
  // }
}
