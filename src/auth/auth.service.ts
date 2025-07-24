import {
  BadRequestException,
  Injectable,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/signup.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(signupDto: SignupDto): Promise<any> {
    const { email} = signupDto;

    const existUser = await this.userService.doesEmailExist(email);
    if (existUser) {
      throw new BadRequestException('Email is already in use');
    
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    return this.userService.createUser({
      ...signupDto,
      password: hashedPassword,
    });
  }

  async login(user: any): Promise<any> {
    try {
      const userdb = await this.userService.findUserByEmail(user.email);
      if (!userdb) {
        throw new HttpException('User not found', 404);
      }

      const isPasswordValid = await bcrypt.compare(
        user.password,
        userdb.password,
      );
      if (!isPasswordValid) {
        throw new HttpException('Invalid password', 401);
      }

      const payload = {
        userId: userdb.id,
        email: userdb.email,
       
      };

      return {
        message: 'Login successful',
        user: payload,
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new InternalServerErrorException(error.message || 'Login failed');
    }
  }
}
