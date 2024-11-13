import { Module } from "@nestjs/common";
import { CampaignService } from "./campaign.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CampaignEntity } from "./entities/campaign.entity";
import { CampaignController } from "./campaign.controller";
import { CampaignCompanyModule } from "src/campaign-company/campaign-company.module";
import { CampaignProjectModule } from "src/campaign-project/campaign-project.module";
import { RenewCalcProjectModule } from "src/renew-calc-project/renew-calc-project.module";
import { TransferProjectModule } from "src/transfer-project/transfer-project.module";
@Module({
  imports: [
    TypeOrmModule.forFeature([CampaignEntity]),
    CampaignCompanyModule,
    CampaignProjectModule,
    RenewCalcProjectModule,
    TransferProjectModule,
  ],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService],
})
export class CampaignModule {}
