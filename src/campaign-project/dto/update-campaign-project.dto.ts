import { PartialType } from '@nestjs/mapped-types';
import { CreateCampaignProjectDto } from './create-campaign-project.dto';

export class UpdateCampaignProjectDto extends PartialType(CreateCampaignProjectDto) {}
