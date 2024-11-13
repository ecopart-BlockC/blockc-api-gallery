import { PartialType } from '@nestjs/mapped-types';
import { CreateCampaignCompanyDto } from './create-campaign-company.dto';

export class UpdateCampaignCompanyDto extends PartialType(CreateCampaignCompanyDto) {}
