import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateNeutralizationDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    userId: number;
}
