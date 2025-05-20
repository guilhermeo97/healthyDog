import { Module } from '@nestjs/common';
import { HistoryTransferService } from './history-transfer.service';
import { HistoryTransferController } from './history-transfer.controller';

@Module({
  controllers: [HistoryTransferController],
  providers: [HistoryTransferService],
})
export class HistoryTransferModule {}
