import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { RouteInventoryService } from "./route-inventory.service";
import { CreateRouteInventoryDto } from "./dtos/route-inventory/create-route-inventory.dto";
import { UpdateRouteInventoryDto } from "./dtos/route-inventory/update-route-inventory.dto";
import { CloseInventoryDTO } from "./dtos/route-inventory/close-inventory.dto";

@Controller("route-inventory")
export class RouteInventoryController {
  constructor(private readonly routeInventoryService: RouteInventoryService) {}

  @Post("inventory")
  createRouteInventory(@Body() body: CreateRouteInventoryDto) {
    return this.routeInventoryService.create(body);
  }

  @Post("close-inventory")
  closeInventory(@Param("id") id: number, @Body() body: CloseInventoryDTO) {
    return this.routeInventoryService.closeInventory(body);
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

  // @Delete()
  // deleteAll() {
  //   return this.routeInventoryService.deleteAll();
  // }
}
