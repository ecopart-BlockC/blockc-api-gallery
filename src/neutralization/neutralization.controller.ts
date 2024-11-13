import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { NeutralizationService } from "./neutralization.service";
import { CreateNeutralizationDto } from "./dto/create-neutralization.dto";
import { UpdateNeutralizationDto } from "./dto/update-neutralization.dto";
import { NeutralizeInventoryDto } from "./dto/neutralize-inventory.dto";

@Controller("neutralization")
export class NeutralizationController {
  constructor(private readonly neutralizationService: NeutralizationService) {}

  @Post()
  create(@Body() createNeutralizationDto: CreateNeutralizationDto) {
    return this.neutralizationService.create(createNeutralizationDto);
  }

  @Post("neutralize-inventory")
  neutralizeInventory(@Body() neutralizeInventory: NeutralizeInventoryDto) {
    return this.neutralizationService.neutralizeInventory(neutralizeInventory);
  }

  @Get()
  findAll() {
    return this.neutralizationService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.neutralizationService.findOne(+id);
  }

  // @Delete()
  // deleteAll() {
  //   this.neutralizationService.deleteAll();
  // }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateNeutralizationDto: UpdateNeutralizationDto
  ) {
    return this.neutralizationService.update(+id, updateNeutralizationDto);
  }
}
