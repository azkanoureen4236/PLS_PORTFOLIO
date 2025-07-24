import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

async createBlog(dto: CreateBlogDto, authorId: number) {
  try{


    return this.prisma.blog.create({
      data: {
        title: dto.title,
        content: dto.content,
        authorId: authorId, 
      },
    });
      }
      catch(error){
        console.error('blog is not craeted :', error);
      }
  }


  //   fingAllBlog() {

  //     return this.prisma.blog.findMany({
  //       include:true,
  //     });
  //   }

  //   async findOneBlog(id: number) {
  //     const blog = await this.prisma.blog.findUnique({
  //       where:{id},
  //       include :{author :true}
  //     });
  //     if (!blog) throw new NotFoundException(`Blog with ID ${id} not found`);
  //     return blog;

  //   }

  //   async updateBlog(id: number, updateBlogDto: UpdateBlogDto) {
  //     const blog = await this.prisma.blog.update({
  //       where : {id},
  //       date: updateBlogDto
  //     })
  //     return blog;
  //   }

  //  async removeBlog(id: number) {
  //     await this.prisma.blog.delete({
  //       where:{id}
  //     })
  //     return {message: `Blog with ${id} has been deleted`}
  //   }
}
