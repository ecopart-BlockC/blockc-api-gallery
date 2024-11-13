import { PartialType } from '@nestjs/mapped-types';
import { CreateNeutralizationDto } from './create-neutralization.dto';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class UpdateNeutralizationDto extends PartialType(CreateNeutralizationDto) {
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
