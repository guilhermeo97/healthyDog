import { Test, TestingModule } from '@nestjs/testing';
import { HistoryTransferService } from './history-transfer.service';

describe('HistoryTransferService', () => {
  let service: HistoryTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryTransferService],
    }).compile();

    service = module.get<HistoryTransferService>(HistoryTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
