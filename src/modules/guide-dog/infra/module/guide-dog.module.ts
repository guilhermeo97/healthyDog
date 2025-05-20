import { Module } from '@nestjs/common';
import { GuideDogService } from '../../guide-dog.service';
import { GuideDogController } from '../../presentation/controllers/guide-dog.controller';

@Module({
  controllers: [GuideDogController],
  providers: [GuideDogService],
})
export class GuideDogModule {}
