import { Test, TestingModule } from '@nestjs/testing';
import { TransferProjectController } from './transfer-project.controller';
import { TransferProjectService } from './transfer-project.service';

describe('TransferProjectController', () => {
  let controller: TransferProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferProjectController],
      providers: [TransferProjectService],
    }).compile();

    controller = module.get<TransferProjectController>(TransferProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
