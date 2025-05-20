import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryTransferService } from './history-transfer.service';
import { CreateHistoryTransferDto } from './dto/create-history-transfer.dto';
import { UpdateHistoryTransferDto } from './dto/update-history-transfer.dto';

@Controller('history-transfer')
export class HistoryTransferController {
  constructor(private readonly historyTransferService: HistoryTransferService) {}

  @Post()
  create(@Body() createHistoryTransferDto: CreateHistoryTransferDto) {
    return this.historyTransferService.create(createHistoryTransferDto);
  }

  @Get()
  findAll() {
    return this.historyTransferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyTransferService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryTransferDto: UpdateHistoryTransferDto) {
    return this.historyTransferService.update(+id, updateHistoryTransferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyTransferService.remove(+id);
  }
}
