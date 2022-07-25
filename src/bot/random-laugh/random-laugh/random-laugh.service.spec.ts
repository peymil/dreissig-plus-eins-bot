import { Test, TestingModule } from '@nestjs/testing';
import { RandomLaughService } from './random-laugh.service';

describe('RandomLaughService', () => {
  let service: RandomLaughService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomLaughService],
    }).compile();

    service = module.get<RandomLaughService>(RandomLaughService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
