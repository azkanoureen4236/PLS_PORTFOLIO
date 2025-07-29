import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async createBlog(dto: CreateBlogDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: dto.authorId },
      });

      if (!user) {
        throw new HttpException('Author not found',400);
      }

      return await this.prisma.blog.create({
        data: {
          title: dto.title,
          content: dto.content,
          authorId: dto.authorId,
        },
      });
    } catch (error) {
      console.error('Blog creation failed:', error);
      throw new HttpException('Failed to create blog', 500);
    }
  }

  async getAllBlog(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const [blogs, total] = await this.prisma.$transaction([
        this.prisma.blog.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: { author: true },
        }),
        this.prisma.blog.count(),
      ]);

      return {
        date: blogs,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      console.error('Blog not found:', error);
      throw new HttpException('Failed to found all blogs', 500);
    }
  }

  async updateBlog(id: number, updateBlogDto: UpdateBlogDto) {
    try {
      const blog = await this.prisma.blog.findUnique({
        where: { id },
      });
      if (!blog) {
        throw new HttpException('blog not found', 401);
      }
      return this.prisma.blog.update({
        where: { id },
        data: updateBlogDto,
      });
    } catch (error) {
      console.error('Blog updation was failed:', error);
      throw new HttpException('Failed to update blog', 500);
    }
  }

  async deleteBlog(id: number) {
    try {
      const blog = await this.prisma.blog.findUnique({
        where: { id },
      });
      if (!blog) {
        throw new HttpException('blog not found', 402);
      }
      return this.prisma.blog.delete({ where: { id } });
    } catch (error) {
      console.error('Blog deletion failed:', error);
      throw new HttpException('Failed to delete blog', 500);
    }
  }

  async getBlogById(id: number) {
    try {
      const blog = await this.prisma.blog.findUnique({
        where: { id },
        include: { author: true },
      });
      if (!blog) {
        throw new HttpException('blog not found', 403);
      }
      return blog;
    } catch (error) {
      console.error(error.message);
      throw new HttpException(
        error.message || 'Failed to get blog by id',
        error.status || 500,
      );
    }
  }
}
