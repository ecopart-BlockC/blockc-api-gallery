import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRouteInventoryDto {
  @IsString()
  @IsNotEmpty()
  Nome: string;

  @IsString()
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
  TCO2e?: number;

  @IsString()
  @IsOptional()
  Status?: string;

  @IsNumber()
  @IsOptional()
  Ativo?: number;
}
