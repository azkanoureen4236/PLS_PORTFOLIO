import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CompanyProfileService } from './company_profile.service';
import { CreateCompanyProfileDto } from './dto/create-company_profile.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class CompanyProfileController {
  constructor(
    private readonly companyProfileService: CompanyProfileService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const url: string = await this.cloudinaryService.upload(file);

    if (!url) {
      throw new HttpException(
        'Unable to upload the image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    await this.companyProfileService.create(url);
    return { message: 'Logo uploaded and saved', url };
  }

  @ApiOperation({ summary: 'Get all logo' })
  @Get('get')
  findAll() {
    return this.companyProfileService.getAll();
  }

  @ApiOperation({ summary: 'Get all logo by id' })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.companyProfileService.getById(+id);
  }

  @ApiOperation({ summary: 'Update logo by id' })
  @ApiParam({ name: 'id', type: Number })
  @Patch(':id')
  updateprofile(
    @Param('id') id: string,
    @Body() createCompanyProfileDto: CreateCompanyProfileDto,
  ) {
    return this.companyProfileService.update(+id, createCompanyProfileDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.companyProfileService.remove(+id);
  // }
}
