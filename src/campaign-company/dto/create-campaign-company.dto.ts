import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateCampaignCompanyDto {
  @IsString()
  campanhaId: string;

  @IsInt()
  empresaId: number;

  @IsBoolean()
  ativo: boolean;

  @IsDate()
  @Type(() => Date)
  criadoEm: Date;

  @IsInt()
  criadoPor: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  modificadoEm?: Date;

  @IsOptional()
  @IsInt()
  modificadoPor?: number;
}
