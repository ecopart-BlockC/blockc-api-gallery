import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { InvNeutralizationService } from './inv-neutralization.service';
import { CreateInvNeutralizationDto } from './dto/create-inv-neutralization.dto';
import { UpdateInvNeutralizationDto } from './dto/update-inv-neutralization.dto';

@Controller('inv-neutralization')
export class InvNeutralizationController {
  constructor(private readonly invNeutralizationService: InvNeutralizationService) {}

  @Post()
  create(@Body() createInvNeutralizationDto: CreateInvNeutralizationDto) {
    return this.invNeutralizationService.create(createInvNeutralizationDto);
  }

  @Get()
  findAll() {
    return this.invNeutralizationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invNeutralizationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvNeutralizationDto: UpdateInvNeutralizationDto) {
    return this.invNeutralizationService.update(+id, updateInvNeutralizationDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.invNeutralizationService.remove(+id);
  // }
}
