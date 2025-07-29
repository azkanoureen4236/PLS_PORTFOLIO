import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  BadRequestException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    if (!signupDto?.email || !signupDto?.password) {
      throw new BadRequestException('Email and password are required');
    }
    return this.authService.signup(signupDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
 async login(loginDto: LoginDto): Promise<any> {
    try {
      const user = await this.authService.validateUser(loginDto.email,loginDto.password);
      if (!user) {
        throw new HttpException('User not found', 404);
      }

      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new HttpException('Invalid password', 401);
      }

      const payload = {
        userId: user.id,
        email: user.email,
       
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
