import { Test, TestingModule } from '@nestjs/testing';
import { TransferProjectService } from './transfer-project.service';

describe('TransferProjectService', () => {
  let service: TransferProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransferProjectService],
    }).compile();

    service = module.get<TransferProjectService>(TransferProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
