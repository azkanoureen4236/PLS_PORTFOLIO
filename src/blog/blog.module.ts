import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule} from '@nestjs/config';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
  ],
  controllers: [BlogController],
  providers: [BlogService, PrismaService, JwtStrategy],
})
export class BlogModule {}
