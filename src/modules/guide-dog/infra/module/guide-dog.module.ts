import { Module } from '@nestjs/common';
import { GuideDogController } from '../../presentation/controllers/guide-dog.controller';

@Module({
  controllers: [GuideDogController],
})
export class GuideDogModule {}
