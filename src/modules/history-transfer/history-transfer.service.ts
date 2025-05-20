import { Injectable } from '@nestjs/common';
import { CreateHistoryTransferDto } from './dto/create-history-transfer.dto';
import { UpdateHistoryTransferDto } from './dto/update-history-transfer.dto';

@Injectable()
export class HistoryTransferService {
  create(createHistoryTransferDto: CreateHistoryTransferDto) {
    return 'This action adds a new historyTransfer';
  }

  findAll() {
    return `This action returns all historyTransfer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historyTransfer`;
  }

  update(id: number, updateHistoryTransferDto: UpdateHistoryTransferDto) {
    return `This action updates a #${id} historyTransfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} historyTransfer`;
  }
}
