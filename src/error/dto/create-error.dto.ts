import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDateString,
  MaxLength,
} from "class-validator";

export class CreateErrorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  App: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  Tela: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  Rotina: string;

  @IsString()
  @IsNotEmpty()
  Descricao: string;

  @IsString()
  @IsOptional()
  Requisicao?: string;

  @IsDateString()
  @IsNotEmpty()
  CriadoEm: Date;
}
