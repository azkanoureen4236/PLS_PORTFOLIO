import { HttpException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(signupDto: SignupDto): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(signupDto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          email: signupDto.email,
          password: hashedPassword,
          name: signupDto.name,
         
        },
      });
      if (!user) {
        throw new HttpException('User creation failed', 500);
      }
      return user;
    } catch (error) {
      throw new HttpException('Failed to create user', 500);
    }
  }

  async findUserByEmail(email: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      throw new HttpException('Failed to fetch user by email', 500);
    }
  }
  async doesEmailExist(email:string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      if (user) {
        return true
      }
      return false;
    } catch (error) {
      throw new HttpException('Failed to fetch user by emaiL', 500);
    }
  }

  async getUserById(userId: number): Promise<any> {
    try {
      return this.prisma.user.findUnique({
        where: { id: userId },
      });
    } catch (error) {
      throw new HttpException('Failed to fetch user by ID', 500);
    }
  }

  async updateUser(userDto: UserDto): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      const user = await this.prisma.user.update({
        where: { email: userDto.email },
        data: {
          name: userDto.name,
          password: hashedPassword,
        },
      });

      if (!user) {
        throw new HttpException('User update failed', 500);
      }

      return user;
    } catch (error) {
      throw new HttpException('Failed to update user', 500);
    }
  }
  

}
