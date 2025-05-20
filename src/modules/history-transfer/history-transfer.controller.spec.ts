import { Test, TestingModule } from '@nestjs/testing';
import { HistoryTransferController } from './history-transfer.controller';
import { HistoryTransferService } from './history-transfer.service';

describe('HistoryTransferController', () => {
  let controller: HistoryTransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryTransferController],
      providers: [HistoryTransferService],
    }).compile();

    controller = module.get<HistoryTransferController>(HistoryTransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
