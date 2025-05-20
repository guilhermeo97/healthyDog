import { Module } from '@nestjs/common';
import { MedicalConsultationService } from './medical_consultation.service';
import { MedicalConsultationController } from './medical_consultation.controller';

@Module({
  controllers: [MedicalConsultationController],
  providers: [MedicalConsultationService],
})
export class MedicalConsultationModule {}
