import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { RouteInventoryService } from "./route-inventory.service";
import { CreateRouteInventoryDto } from "./dtos/route-inventory/create-route-inventory.dto";
import { UpdateRouteInventoryDto } from "./dtos/route-inventory/update-route-inventory.dto";
// import { CreateRouteInventoryRegistryDto } from "./dtos/route-inventory-registry/create-route-inventory-registry.dto";
// import { UpdateRouteInventoryRegistryDto } from "./dtos/route-inventory-registry/update-route-inventory-registry.dto";
// import { RouteInventoryRegistryService } from "./route-inventory-registry.service";

@Controller("route-inventory")
export class RouteInventoryController {
  constructor(
    private readonly routeInventoryService: RouteInventoryService
    // private routeInventoryRegistryService: RouteInventoryRegistryService
  ) {}

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
  findAllRouteInventory() {
    return this.routeInventoryService.findAll();
  }

  @Delete("inventory/:id")
  deleteRouteInventory(@Param("id") id: number) {
    return this.routeInventoryService.delete(id);
  }

  // registros

  // @Post("registry")
  // create(@Body() body: CreateRouteInventoryRegistryDto) {
  //   return this.routeInventoryRegistryService.create(body);
  // }

  // @Patch("registry/:id")
  // update(
  //   @Param("id") id: number,
  //   @Body() body: UpdateRouteInventoryRegistryDto
  // ) {
  //   return this.routeInventoryRegistryService.update(id, body);
  // }

  // @Get("registry/:id")
  // findOne(@Param("id") id: number) {
  //   return this.routeInventoryRegistryService.findOne(id);
  // }

  // @Get("registry")
  // findAll() {
  //   return this.routeInventoryRegistryService.findAll();
  // }

  // @Delete("registry/:id")
  // delete(@Param("id") id: number) {
  //   return this.routeInventoryRegistryService.delete(id);
  // }
}
