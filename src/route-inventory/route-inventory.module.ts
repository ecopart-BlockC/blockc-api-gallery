import { CompanyModule } from "src/company/company.module";
import { Module } from "@nestjs/common";
import { Pais } from "src/pais/entities/pais.entity";
import { RouteInventory } from "./entities/route-inventory.entity";
import { RouteInventoryController } from "./route-inventory.controller";
import { RouteInventoryService } from "./route-inventory.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioModule } from "src/usuario/usuario.module";

@Module({
  imports: [
    UsuarioModule,
    CompanyModule,
    TypeOrmModule.forFeature([RouteInventory, Pais]),
  ],
  controllers: [RouteInventoryController],
  providers: [RouteInventoryService],
  exports: [RouteInventoryService],
})
export class RouteInventoryModule {}
