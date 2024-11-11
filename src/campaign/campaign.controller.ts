import { Controller, Get,} from '@nestjs/common';
import { CampaignService } from './campaign.service';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get()
  async findAllCampaignWithCompany() {
    return await this.campaignService.findCampaignWithCompany();
  }

}
