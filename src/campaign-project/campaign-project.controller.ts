import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { CampaignProjectService } from "./campaign-project.service";
import { CreateCampaignProjectDto } from "./dto/create-campaign-project.dto";

@Controller("campaign-project")
export class CampaignProjectController {
  constructor(
    private readonly campaignProjectService: CampaignProjectService
  ) {}

  @Post()
  create(@Body() createCampaignProjectDto: CreateCampaignProjectDto) {
    return this.campaignProjectService.create(createCampaignProjectDto);
  }

  @Get()
  findAll() {
    return this.campaignProjectService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.campaignProjectService.findOne(id);
  }

  // @Delete()
  // removeAll() {
  //   return this.campaignProjectService.removeAll();
  // }
}
