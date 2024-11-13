import { Module } from "@nestjs/common";
import { CampaignProjectService } from "./campaign-project.service";
import { CampaignProjectController } from "./campaign-project.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CampaignProject } from "./entities/campaign-project.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CampaignProject])],
  controllers: [CampaignProjectController],
  providers: [CampaignProjectService],
  exports: [CampaignProjectService],
})
export class CampaignProjectModule {}
