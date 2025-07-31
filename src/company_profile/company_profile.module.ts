import { Module } from '@nestjs/common';
import { CompanyProfileController } from './company_profile.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyProfileService } from './company_profile.service';


@Module({
  imports : [],
  controllers: [CompanyProfileController],
  providers: [CompanyProfileService,PrismaService,],
})
export class CompanyProfileModule {}
