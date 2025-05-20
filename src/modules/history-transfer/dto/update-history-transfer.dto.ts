import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoryTransferDto } from './create-history-transfer.dto';

export class UpdateHistoryTransferDto extends PartialType(CreateHistoryTransferDto) {}
