import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRouteInventoryDto {
  @IsString()
  @IsNotEmpty()
  Nome: string;

  @IsNumber()
  @IsNotEmpty()
  CompanyId: number;

  @IsNumber()
  @IsNotEmpty()
  CriadoPor: number;

  @IsString()
  @IsNotEmpty()
  CountryID: string;

  @IsNumber()
  @IsOptional()
  tCO2e?: number;

  @IsNumber()
  @IsOptional()
  Saldo?: number;

  @IsString()
  @IsOptional()
  Status?: string;

  @IsNumber()
  @IsOptional()
  Ativo?: number;
}
