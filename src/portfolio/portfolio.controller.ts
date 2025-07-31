import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @ApiBody({type : CreatePortfolioDto})
  @Post('create')
  create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.createPortfolio(createPortfolioDto);
  }

  @Get('get')
  getAll() {
    return this.portfolioService.getportfolio();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.portfolioService.getById(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePortfolioDto: UpdatePortfolioDto) {
  //   return this.portfolioService.update(+id, updatePortfolioDto);
  // }
@ApiOperation ({summary : 'Delete a blog by id'})
  @Delete(':id')
     deleteById(@Param('id') id: string) {
    return this.portfolioService.deleteportfolio(+id);
  }
}
