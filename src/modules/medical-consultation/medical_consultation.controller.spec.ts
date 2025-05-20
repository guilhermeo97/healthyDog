import { Test, TestingModule } from '@nestjs/testing';
import { MedicalConsultationController } from './medical_consultation.controller';
import { MedicalConsultationService } from './medical_consultation.service';

describe('MedicalConsultationController', () => {
  let controller: MedicalConsultationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalConsultationController],
      providers: [MedicalConsultationService],
    }).compile();

    controller = module.get<MedicalConsultationController>(MedicalConsultationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
