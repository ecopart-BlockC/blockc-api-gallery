import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { InvNeutralizationService } from "./inv-neutralization.service";
import { CreateInvNeutralizationDto } from "./dto/create-inv-neutralization.dto";

@Controller("inv-neutralization")
export class InvNeutralizationController {
  constructor(
    private readonly invNeutralizationService: InvNeutralizationService
  ) {}

  @Post()
  create(@Body() createInvNeutralizationDto: CreateInvNeutralizationDto) {
    return this.invNeutralizationService.create(createInvNeutralizationDto);
  }

  @Get()
  findAll() {
    return this.invNeutralizationService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.invNeutralizationService.findOne(+id);
  }

  @Delete()
  deleteAll() {
    return this.invNeutralizationService.deleteAll();
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.invNeutralizationService.remove(+id);
  // }
}
