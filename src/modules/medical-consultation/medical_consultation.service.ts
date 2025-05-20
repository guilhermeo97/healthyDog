import { Injectable } from '@nestjs/common';
import { CreateMedicalConsultationDto } from './dto/create-medical_consultation.dto';
import { UpdateMedicalConsultationDto } from './dto/update-medical_consultation.dto';

@Injectable()
export class MedicalConsultationService {
  create(createMedicalConsultationDto: CreateMedicalConsultationDto) {
    return 'This action adds a new medicalConsultation';
  }

  findAll() {
    return `This action returns all medicalConsultation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalConsultation`;
  }

  update(id: number, updateMedicalConsultationDto: UpdateMedicalConsultationDto) {
    return `This action updates a #${id} medicalConsultation`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalConsultation`;
  }
}
