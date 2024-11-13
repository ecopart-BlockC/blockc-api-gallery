import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RouteInventory } from "./entities/route-inventory.entity";
import { Repository } from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Pais } from "src/pais/entities/pais.entity";
import { CreateRouteInventoryDto } from "./dtos/route-inventory/create-route-inventory.dto";
import { UpdateRouteInventoryDto } from "./dtos/route-inventory/update-route-inventory.dto";
import { CloseInventoryDTO } from "./dtos/route-inventory/close-inventory.dto";

@Injectable()
export class RouteInventoryService {
  constructor(
    @InjectRepository(RouteInventory)
    private readonly routeInventoryRepository: Repository<RouteInventory>
  ) {}

  closeInventory(closeInventoryDTO: CloseInventoryDTO) {
    const user = new Usuario();
    user.ID = closeInventoryDTO.userId;
    return this.routeInventoryRepository.update(closeInventoryDTO.inventoryId, {
      Status: "Fechado",
      ModificadoEm: new Date(),
      ModificadoPor: user,
    });
  }

  // qualquer usuario pode ver todos os inventarios de rotas?
  findAll(param?: { companyId?: number; userId?: number }) {
    console.log(param);

    return this.routeInventoryRepository.find({
      where: {
        CompanyId: param.companyId,
        CriadoPor: param.userId ? { ID: param.userId } : undefined,
      },
      relations: ["CriadoPor", "ModificadoPor", "Country"],
    });
  }

  // qualquer usuario pode ver um inventario de rota especifico?
  async findOne(ID: number) {
    const inventoryRoute = await this.routeInventoryRepository.findOne({
      where: { ID },
      // relations: ["CriadoPor", "ModificadoPor", "Country"],
      relations: {
        CriadoPor: true,
        ModificadoPor: true,
        Country: true,
        neutralizations: true,
      },
    });

    if (!inventoryRoute)
      throw new HttpException(
        "ROUTE INVENTARY NOT FOUND",
        HttpStatus.NOT_FOUND
      );

    return inventoryRoute;
  }

  create(createRouteInventoryDto: CreateRouteInventoryDto) {
    const user = new Usuario({
      ID: createRouteInventoryDto.CriadoPor,
    });

    const pais = new Pais({
      ID: createRouteInventoryDto.CountryID,
    });

    return this.routeInventoryRepository.save({
      Nome: createRouteInventoryDto.Nome,
      CompanyId: createRouteInventoryDto.CompanyId,
      CriadoPor: user,
      ModificadoPor: user,
      tCO2e: 10000,
      Saldo: 10000,
      CriadoEm: new Date(),
      ModificadoEm: new Date(),
      Country: pais,
      Status: createRouteInventoryDto.Status || "em andamento",
      Ativo: createRouteInventoryDto.Ativo || 1,
    });
  }

  async update(id: number, updateRouteInventoryDto: UpdateRouteInventoryDto) {
    const user = new Usuario();
    user.ID = updateRouteInventoryDto.ModificadoPor;

    const result = await this.routeInventoryRepository.update(id, {
      ...updateRouteInventoryDto,
      ModificadoPor: user,
    });

    if (result.affected === 0)
      throw new HttpException(
        "ROUTE INVENTARY NOT FOUND",
        HttpStatus.NOT_FOUND
      );

    return {
      message: "Successful updated route inventory",
    };
  }

  // qualquer usuario pode deletar um inventario de rota?
  async delete(id: number) {
    const result = await this.routeInventoryRepository.delete(id);

    if (result.affected === 0)
      throw new HttpException(
        "ROUTE INVENTARY NOT FOUND",
        HttpStatus.NOT_FOUND
      );

    return {
      message: "Successful deleted route inventory",
    };
  }

  async deleteAll() {
    const inventories = await this.routeInventoryRepository.find();
    inventories.forEach((inventory) => {
      this.routeInventoryRepository.delete(inventory.ID);
    });
    return { message: "ok" };
  }
}
