import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CompanyProfileService } from './company_profile.service';
import { CreateCompanyProfileDto } from './dto/create-company_profile.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';





@Controller('profile')
export class CompanyProfileController {
  constructor(private readonly companyProfileService: CompanyProfileService) {}
  
  @ApiBody({type : CreateCompanyProfileDto})
  @Post('create')
  create(@Body() createCompanyProfileDto: CreateCompanyProfileDto) {
    return this.companyProfileService.create(createCompanyProfileDto);
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
   updateprofile(@Param('id') id: string, @Body() createCompanyProfileDto:CreateCompanyProfileDto) {
    return this.companyProfileService.update(+id, createCompanyProfileDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.companyProfileService.remove(+id);
  // }
}
