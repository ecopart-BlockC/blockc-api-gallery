import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { RouteInventoryService } from "./route-inventory.service";
import { CreateRouteInventoryDto } from "./dtos/route-inventory/create-route-inventory.dto";
import { UpdateRouteInventoryDto } from "./dtos/route-inventory/update-route-inventory.dto";

@Controller("route-inventory")
export class RouteInventoryController {
  constructor(private readonly routeInventoryService: RouteInventoryService) {}

  @Post("inventory")
  createRouteInventory(@Body() body: CreateRouteInventoryDto) {
    return this.routeInventoryService.create(body);
  }

  @Patch("inventory/:id")
  updateRouteInventory(
    @Param("id") id: number,
    @Body() body: UpdateRouteInventoryDto
  ) {
    return this.routeInventoryService.update(id, body);
  }

  @Get("inventory/:id")
  findOneRouteInventory(@Param("id") id: number) {
    return this.routeInventoryService.findOne(id);
  }

  @Get("inventory")
  findAllRouteInventory(
    @Query() query: { userId?: number; companyId?: number }
  ) {
    return this.routeInventoryService.findAll(query);
  }

  @Delete("inventory/:id")
  deleteRouteInventory(@Param("id") id: number) {
    return this.routeInventoryService.delete(id);
  }
}
