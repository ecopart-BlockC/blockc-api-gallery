import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

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

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    amount: number;
}
