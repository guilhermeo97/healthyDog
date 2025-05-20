import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalConsultationService } from './medical_consultation.service';
import { CreateMedicalConsultationDto } from './dto/create-medical_consultation.dto';
import { UpdateMedicalConsultationDto } from './dto/update-medical_consultation.dto';

@Controller('medical-consultation')
export class MedicalConsultationController {
  constructor(private readonly medicalConsultationService: MedicalConsultationService) {}

  @Post()
  create(@Body() createMedicalConsultationDto: CreateMedicalConsultationDto) {
    return this.medicalConsultationService.create(createMedicalConsultationDto);
  }

  @Get()
  findAll() {
    return this.medicalConsultationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalConsultationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalConsultationDto: UpdateMedicalConsultationDto) {
    return this.medicalConsultationService.update(+id, updateMedicalConsultationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalConsultationService.remove(+id);
  }
}
