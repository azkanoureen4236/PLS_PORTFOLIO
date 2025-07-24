import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpException,InternalServerErrorException,} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/signup.dto';
import { Role } from '@prisma/client';


@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,) {}

  async signup(signupDto: SignupDto): Promise<any> {
  const {email,role} = signupDto;

  const existUser = await this.userService.findUserByEmail(email)
  if (existUser){
    throw new BadRequestException('email is already exist')

  }
  if (role === Role.ADMIN){
    const existingAdmin = await this.userService.findUserByRole(Role.ADMIN) 

    if (existingAdmin){
      throw new HttpException('Admin already exist',200)
    }
   }
   return this.userService.createUser(signupDto)
  }
  async login(user: any): Promise<any> {
    
    try {
      const userdb = await this.userService.findUserByEmail(user.email);
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      if (user.password !== user.password) {
        throw new HttpException('Invalid password', 401);
      }
      const payload = {
        userId: user.id,
        email: user.email,
        password: user.password,
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new InternalServerErrorException(error.message || 'Login failed');
    }
  }
 

}

