import { Test, TestingModule } from '@nestjs/testing';
import { ForbidGamesService } from './forbid-games.service';

describe('ForbidGamesService', () => {
  let service: ForbidGamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForbidGamesService],
    }).compile();

    service = module.get<ForbidGamesService>(ForbidGamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
