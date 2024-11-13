import { PartialType } from '@nestjs/mapped-types';
import { CreateTransferProjectDto } from './create-transfer-project.dto';

export class UpdateTransferProjectDto extends PartialType(CreateTransferProjectDto) {}
