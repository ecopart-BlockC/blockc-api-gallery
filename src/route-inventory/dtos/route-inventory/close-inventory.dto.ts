import { IsNotEmpty, IsNumber } from "class-validator";

export class CloseInventoryDTO {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  inventoryId: number;
}
