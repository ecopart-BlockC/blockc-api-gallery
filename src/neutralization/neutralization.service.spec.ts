import { Test, TestingModule } from '@nestjs/testing';
import { NeutralizationService } from './neutralization.service';

describe('NeutralizationService', () => {
  let service: NeutralizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeutralizationService],
    }).compile();

    service = module.get<NeutralizationService>(NeutralizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
