import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class NeutralizeInventoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @IsString()
  campaignId: string;

  @IsNotEmpty()
  @IsInt()
  companyId: number;

  @IsNotEmpty()
  @IsInt()
  inventoryId: number;

  @IsNotEmpty()
  projects: {
    amount: number;
    campaignProjectId: string;
    projectId: number;
    // scope: number;
  }[];
}
