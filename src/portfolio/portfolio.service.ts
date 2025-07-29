import { HttpException, Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async createPortfolio(createPortfolioDto: CreatePortfolioDto) {
    try {
      return await this.prisma.portfolio.create({ data: createPortfolioDto });
    } catch (error) {
      console.error('failed to create portfolio', error);
      throw new HttpException('portfolio creation failed', 500);
    }
  }

   async getportfolio() {
    try{
   return await this.prisma.portfolio.findMany();
    }
    catch(error){
  console.error('failed to fetch portfolios', 500)
  throw new HttpException ('could not fetch portfolio', 500)
    }
    }

  async getById(id: number) {
    const portfolio = await this.prisma.portfolio.findUnique({ where : { id}})
    if (!portfolio){
      throw new HttpException ('portfolio not found', 404)

   }
   return portfolio;
  }

  // update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
  //   return `This action updates a #${id} portfolio`;
  // }

  async deleteportfolio(id: number) {
    try {
      const portfolio = await this.prisma.portfolio.findUnique({
        where: { id },
      });
      if (!portfolio) {
        throw new HttpException('portfolio not found', 404);
      }
      return this.prisma.portfolio.delete({ where: { id } });
    } catch (error) {
      console.error('portfolio deletion failed:', error);
      throw new HttpException('Failed to delete portfolio', 500);
    }
  }
}
