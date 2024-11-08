import { IsInt, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateTransferProjectDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  companyID: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  destinationCompanyId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  projectGoId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  userId: number;
}
