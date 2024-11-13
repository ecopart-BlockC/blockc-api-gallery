import { PartialType } from '@nestjs/mapped-types';
import { CreateInvNeutralizationDto } from './create-inv-neutralization.dto';

export class UpdateInvNeutralizationDto extends PartialType(CreateInvNeutralizationDto) {}
