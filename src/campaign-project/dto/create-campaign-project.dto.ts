import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateCampaignProjectDto {
  @IsString()
  campanhaId: string;

  @IsOptional()
  @IsString()
  campanhaProjetoId: string;

  @IsInt()
  projetoId: number;

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

  @IsOptional()
  @IsNumber()
  saldo?: number;

  @IsOptional()
  @IsNumber()
  quantidade?: number;
}
