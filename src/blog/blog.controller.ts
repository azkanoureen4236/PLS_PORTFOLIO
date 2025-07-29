import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { RoleGuard } from 'src/guards/role/role.guard';
import { Roles } from 'src/guards/role/role.dacorator';
import { Role } from 'src/guards/role/role.enum';
import { AuthGuard } from '@nestjs/passport';



@ApiTags('Blogs')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}


@UseGuards(AuthGuard('jwt'),RoleGuard)
  @Roles(Role.ADMIN)
  @Post('create')
  @ApiBody({ type: CreateBlogDto })
  createBlog(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.createBlog(createBlogDto);
  }
  @Get()
  @ApiOperation({ summary: 'Get all blogs with optional pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getAllBlogs(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.blogService.getAllBlog(Number(page), Number(limit));
  }

@UseGuards(AuthGuard('jwt'),RoleGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a blog by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateBlogDto })
  updateBlog(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.updateBlog(Number(id), updateBlogDto);
  }

  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog by ID' })
  @ApiParam({ name: 'id', type: Number })
  deleteBlog(@Param('id') id: string) {
    return this.blogService.deleteBlog(Number(id));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a blog by ID' })
  @ApiParam({ name: 'id', type: Number })
  getBlogById(@Param('id') id: string) {
    
    return this.blogService.getBlogById(Number(id));
  }
}
