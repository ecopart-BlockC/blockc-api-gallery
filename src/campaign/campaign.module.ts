import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignEntity } from './entities/campaign.entity';
import { CampaignController } from './campaign.controller';
@Module({
  imports: [TypeOrmModule.forFeature([CampaignEntity])],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService],
})
export class CampaignModule {}



