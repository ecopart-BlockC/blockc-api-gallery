import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignEntity } from './entities/campaign.entity';
import { Repository } from 'typeorm';
import { ErrorService } from 'src/error/error.service';
@Injectable()
export class CampaignService {

constructor(
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
    private readonly errorService: ErrorService,
) {}

  async findCampaignWithCompany(): Promise<CampaignEntity[]> {
    return this.campaignRepository.find({
      select:{}
    });
  }
 }

