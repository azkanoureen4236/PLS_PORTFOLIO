import {Body,Controller,Get,Param,Patch,Req, UseGuards,} from '@nestjs/common';
import { UserService } from './user.service';
//import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  

  @Get(':id')
  getUser( @Param('id') id: string) {
    const userId = parseInt(id, 10);
    return this.userService.getUserById(userId);
  }
// @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  updateUser(@Req() req: any, @Body() updateData: UserDto) {
    const user = req.user;
    return this.userService.updateUser({...updateData,email:user.email});
  }






}
