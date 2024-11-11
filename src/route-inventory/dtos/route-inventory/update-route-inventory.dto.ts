import { IsNotEmpty, IsNumber } from "class-validator";
import { OmitType, PartialType } from "@nestjs/mapped-types";

import { CreateRouteInventoryDto } from "./create-route-inventory.dto";

export class UpdateRouteInventoryDto extends PartialType(
  OmitType(CreateRouteInventoryDto, ["CompanyId", "CriadoPor"] as const)
) {
  @IsNumber()
  @IsNotEmpty()
  ModificadoPor: number;
}
