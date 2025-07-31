import { HttpException, Injectable,Inject } from '@nestjs/common';
import { CreateCompanyProfileDto } from './dto/create-company_profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompanyProfileDto:CreateCompanyProfileDto ) {
    try {
      return await this.prisma.company_profile.create({ data:createCompanyProfileDto });
    } catch (error) {
      console.error('failed to create company_profile', error);
      throw new HttpException('company_profile creation failed', 500);
    }
  }
  async getAll() {
    try{
      return await this.prisma.company_profile.findMany();
     }
     catch(error){
      console.error('failed to fetch company_profile logo' , error)
      throw new HttpException('logo was not found' , 500)
     }  
  }

  async getById(id: number) {
    try{
      const profile = await this.prisma.company_profile.findUnique({where : {id}})
    if (!profile){
      throw new HttpException('logo not found', 404)
    }
    return profile;
    }
    catch(error){
      console.error('logo was not fetch', 500)
      throw new HttpException('logo not found' , 404)

    }
  }

  async update(id: number, createCompanyProfileDto:CreateCompanyProfileDto) {
     try {
      const profile = await this.prisma.company_profile.findUnique({
        where: { id },
      });
      if (!profile) {
        throw new HttpException('logo not found', 401);
      }
      return this.prisma.company_profile.update({
        where: { id },
        data: createCompanyProfileDto,
      });
    } catch (error) {
      console.error('Logo updation was failed:', error);
      throw new HttpException('Failed to update logo', 500);
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} companyProfile`;
  // }
}
