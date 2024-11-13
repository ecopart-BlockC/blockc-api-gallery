import { Test, TestingModule } from '@nestjs/testing';
import { InvNeutralizationService } from './inv-neutralization.service';

describe('InvNeutralizationService', () => {
  let service: InvNeutralizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvNeutralizationService],
    }).compile();

    service = module.get<InvNeutralizationService>(InvNeutralizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
