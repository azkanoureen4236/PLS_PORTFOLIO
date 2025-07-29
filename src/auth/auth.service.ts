import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const existingUser = await this.userService.doesEmailExist(signupDto.email);
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    const newUser = await this.userService.createUser({
    ...signupDto,
    password: hashedPassword,
  });

  const payload = {
    userId: newUser.id,
    email: newUser.email,
    role: newUser.role,
  };

  const token = await this.jwtService.signAsync(payload);

  return {
    access_token: token,
    user: {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    },
  };
}

  async login(loginDto:LoginDto) {
    const payload = {
      
      email: loginDto.email,
      password: loginDto.password,
    };

    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      user: { password: loginDto.password, email: loginDto.email },
    
    };
  }
  async validateUser (email: string, password: string): Promise<any | null> {
  
    const user  = await this.userService.findUserByEmail(email);
    if (!user) 
      {
          
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
