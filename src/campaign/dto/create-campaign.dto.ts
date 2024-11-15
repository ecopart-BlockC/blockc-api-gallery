import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCampaignDto {
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsString()
  dataIni: string;

  @IsString()
  dataFim: string;

  @IsOptional()
  @IsString()
  imagemCapa?: string;

  @IsInt()
  userId: number;

  @IsOptional()
  projects: {
    id: number;
    quantity: number;
    type: string;
  }[];

  @IsOptional()
  companyIds: number[];

  @IsInt()
  @IsNotEmpty()
  createdCompanyId: number;
}
