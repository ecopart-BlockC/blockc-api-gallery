import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class CreateInvNeutralizationDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  projectGoId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  companyId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  inventoryId: number;

  @IsString()
  @IsNotEmpty()
  campanhaProjetoId: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  @IsInt()
  NeutralizacaoId: number;
}
