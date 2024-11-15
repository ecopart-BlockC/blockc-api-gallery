import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CampaignService } from "./campaign.service";
import { CreateCampaignDto } from "./dto/create-campaign.dto";

@Controller("campaign")
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.create(createCampaignDto);
  }

  @Get()
  async findAllCampaignWithCompany(@Query() params: { companyId?: number }) {
    return await this.campaignService.findCampaignWithCompany(params);
  }

  // @Delete()
  // deleteAll() {
  //   return this.campaignService.deleteAll();
  // }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.campaignService.findCampaignDetails(id);
  }
}
