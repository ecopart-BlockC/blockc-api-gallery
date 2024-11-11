import {
  IsOptional,
  IsInt,
  IsString,
  IsDecimal,
  IsDate,
  IsNumber,
} from "class-validator";

export class CreateRenewCalcProjectDto {
  @IsOptional()
  @IsInt()
  CompanyIdRecipient?: number;

  @IsOptional()
  @IsString()
  CompanyName?: string;

  @IsOptional()
  @IsString()
  CompanyNumber?: string;

  @IsOptional()
  @IsString()
  CertificationProcess?: string;

  @IsOptional()
  @IsString()
  BioFuel?: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: "4", force_decimal: true })
  VolumeEmission?: number;

  @IsOptional()
  @IsString()
  InitialEmission?: string;

  @IsOptional()
  @IsString()
  FinalEmission?: string;

  @IsOptional()
  @IsDate()
  CertificateExpirationDate?: Date;

  @IsOptional()
  @IsString()
  BaseYear?: string;

  @IsOptional()
  @IsString()
  EvidenceFiles?: string;

  @IsOptional()
  @IsInt()
  CriadoPor?: number;

  @IsOptional()
  @IsDate()
  CriadoEm?: Date;

  @IsOptional()
  @IsString()
  FinanceBenefitsAnswer?: string;

  @IsOptional()
  @IsString()
  Status?: string;

  @IsOptional()
  @IsString()
  AuditFiles?: string;

  @IsOptional()
  @IsInt()
  AlteradoPor?: number;

  @IsOptional()
  @IsDate()
  AlteradoEm?: Date;

  @IsOptional()
  @IsNumber()
  Saldo?: number;
}
