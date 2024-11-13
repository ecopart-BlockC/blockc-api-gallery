import { Test, TestingModule } from '@nestjs/testing';
import { CampaignProjectService } from './campaign-project.service';

describe('CampaignProjectService', () => {
  let service: CampaignProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampaignProjectService],
    }).compile();

    service = module.get<CampaignProjectService>(CampaignProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
