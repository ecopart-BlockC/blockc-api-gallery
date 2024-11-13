import { Test, TestingModule } from '@nestjs/testing';
import { CampaignCompanyService } from './campaign-company.service';

describe('CampaignCompanyService', () => {
  let service: CampaignCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampaignCompanyService],
    }).compile();

    service = module.get<CampaignCompanyService>(CampaignCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
