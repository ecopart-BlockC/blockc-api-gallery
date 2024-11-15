import { CreateNeutralizationDto } from "./create-neutralization.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateNeutralizationDto extends PartialType(
  CreateNeutralizationDto
) {}
