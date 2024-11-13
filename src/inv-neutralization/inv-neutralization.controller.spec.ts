import { Test, TestingModule } from '@nestjs/testing';
import { InvNeutralizationController } from './inv-neutralization.controller';
import { InvNeutralizationService } from './inv-neutralization.service';

describe('InvNeutralizationController', () => {
  let controller: InvNeutralizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvNeutralizationController],
      providers: [InvNeutralizationService],
    }).compile();

    controller = module.get<InvNeutralizationController>(InvNeutralizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
