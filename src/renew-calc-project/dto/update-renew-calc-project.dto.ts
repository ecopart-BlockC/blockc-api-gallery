import { PartialType } from "@nestjs/mapped-types";
import { CreateRenewCalcProjectDto } from "./create-renew-calc-project.dto";

export class UpdateRenewCalcProjectDto extends PartialType(
  CreateRenewCalcProjectDto
) {}
