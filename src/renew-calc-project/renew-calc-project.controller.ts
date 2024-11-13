import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Put,
  ParseIntPipe,
} from "@nestjs/common";
import { RenewCalcProjectService } from "./renew-calc-project.service";
import { UpdateRenewCalcProjectDto } from "./dto/update-renew-calc-project.dto";

@Controller("renew-calc-project")
export class RenewCalcProjectController {
  constructor(
    private readonly renewCalcProjectService: RenewCalcProjectService
  ) {}

  @Get()
  findAll() {
    return this.renewCalcProjectService.findAll();
  }

  @Get("activities/:id")
  findAllActivies(@Param("id", ParseIntPipe) id: number) {
    return this.renewCalcProjectService.findAllActivies(id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.renewCalcProjectService.findOne(+id);
  }

  @Put()
  updateAll() {
    return this.renewCalcProjectService.updateAll();
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRenewCalcProjectDto: UpdateRenewCalcProjectDto
  ) {
    return this.renewCalcProjectService.update(+id, updateRenewCalcProjectDto);
  }
}
