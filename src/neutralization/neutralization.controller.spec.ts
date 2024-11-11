import { Test, TestingModule } from '@nestjs/testing';
import { NeutralizationController } from './neutralization.controller';
import { NeutralizationService } from './neutralization.service';

describe('NeutralizationController', () => {
  let controller: NeutralizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NeutralizationController],
      providers: [NeutralizationService],
    }).compile();

    controller = module.get<NeutralizationController>(NeutralizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
