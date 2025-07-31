import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PortfolioModule } from './portfolio/portfolio.module';
import { CompanyProfileModule } from './company_profile/company_profile.module';

@Module({
  imports: [AuthModule,PrismaModule, UserModule, BlogModule,JwtModule, PortfolioModule, CompanyProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
