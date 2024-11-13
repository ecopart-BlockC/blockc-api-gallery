import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { CampaignCompanyService } from "./campaign-company.service";
import { CreateCampaignCompanyDto } from "./dto/create-campaign-company.dto";
import { UpdateCampaignCompanyDto } from "./dto/update-campaign-company.dto";

@Controller("campaign-company")
export class CampaignCompanyController {
  constructor(
    private readonly campaignCompanyService: CampaignCompanyService
  ) {}

  @Post()
  create(@Body() createCampaignCompanyDto: CreateCampaignCompanyDto) {
    return this.campaignCompanyService.create(createCampaignCompanyDto);
  }

  @Get()
  findAll() {
    return this.campaignCompanyService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.campaignCompanyService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCampaignCompanyDto: UpdateCampaignCompanyDto
  ) {
    return this.campaignCompanyService.update(+id, updateCampaignCompanyDto);
  }

  // @Delete()
  // deleteAll() {
  //   return this.campaignCompanyService.removeAll();
  // }
}
