import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RenewCalcProjectService } from './renew-calc-project.service';
import { CreateRenewCalcProjectDto } from './dto/create-renew-calc-project.dto';
import { UpdateRenewCalcProjectDto } from './dto/update-renew-calc-project.dto';

@Controller('renew-calc-project')
export class RenewCalcProjectController {
  constructor(private readonly renewCalcProjectService: RenewCalcProjectService) {}

  @Post()
  create(@Body() createRenewCalcProjectDto: CreateRenewCalcProjectDto) {
    return this.renewCalcProjectService.create(createRenewCalcProjectDto);
  }

  @Get()
  findAll() {
    return this.renewCalcProjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.renewCalcProjectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRenewCalcProjectDto: UpdateRenewCalcProjectDto) {
    return this.renewCalcProjectService.update(+id, updateRenewCalcProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.renewCalcProjectService.remove(+id);
  }
}
