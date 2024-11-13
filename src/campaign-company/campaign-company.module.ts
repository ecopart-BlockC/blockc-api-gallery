import { Module } from "@nestjs/common";
import { CampaignCompanyService } from "./campaign-company.service";
import { CampaignCompanyController } from "./campaign-company.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CampaignCompany } from "./entities/campaign-company.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CampaignCompany])],
  controllers: [CampaignCompanyController],
  providers: [CampaignCompanyService],
  exports: [CampaignCompanyService],
})
export class CampaignCompanyModule {}
