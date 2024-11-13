import { Test, TestingModule } from '@nestjs/testing';
import { CampaignCompanyController } from './campaign-company.controller';
import { CampaignCompanyService } from './campaign-company.service';

describe('CampaignCompanyController', () => {
  let controller: CampaignCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignCompanyController],
      providers: [CampaignCompanyService],
    }).compile();

    controller = module.get<CampaignCompanyController>(CampaignCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
