import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { ErrorService } from "./error.service";
import { CreateErrorDto } from "./dto/create-error.dto";

@Controller("error")
export class ErrorController {
  constructor(private readonly errorService: ErrorService) {}

  @Post()
  create(@Body() createErrorDto: CreateErrorDto) {
    return this.errorService.create(createErrorDto);
  }

  @Get()
  findAll() {
    return this.errorService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.errorService.findOne(+id);
  }
}
