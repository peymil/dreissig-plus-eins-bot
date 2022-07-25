import { Test, TestingModule } from '@nestjs/testing';
import { RandomLaughGateway } from './random-laugh.gateway';

describe('RandomLaughGateway', () => {
  let gateway: RandomLaughGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomLaughGateway],
    }).compile();

    gateway = module.get<RandomLaughGateway>(RandomLaughGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
