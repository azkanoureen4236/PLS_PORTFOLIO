import { Module } from '@nestjs/common';
import { CompanyProfileController } from './company_profile.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyProfileService } from './company_profile.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';


@Module({
  imports :[CloudinaryModule],
  controllers: [CompanyProfileController],
  providers: [CompanyProfileService,PrismaService,],
})
export class CompanyProfileModule {}
