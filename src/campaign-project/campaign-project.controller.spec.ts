import { Test, TestingModule } from '@nestjs/testing';
import { CampaignProjectController } from './campaign-project.controller';
import { CampaignProjectService } from './campaign-project.service';

describe('CampaignProjectController', () => {
  let controller: CampaignProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignProjectController],
      providers: [CampaignProjectService],
    }).compile();

    controller = module.get<CampaignProjectController>(CampaignProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
