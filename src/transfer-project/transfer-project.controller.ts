import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
} from "@nestjs/common";
import { TransferProjectService } from "./transfer-project.service";
import { CreateTransferProjectDto } from "./dto/create-transfer-project.dto";

@Controller("transfer-project")
export class TransferProjectController {
  constructor(
    private readonly transferProjectService: TransferProjectService
  ) {}

  @Post()
  async create(@Body() createTransferProjectDto: CreateTransferProjectDto) {
    try {
      return await this.transferProjectService.create(createTransferProjectDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  findAll() {
    return this.transferProjectService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.transferProjectService.findOne(+id);
  }

  // @Delete()
  // deleteAll() {
  //   return this.transferProjectService.deleteAll();
  // }
}
