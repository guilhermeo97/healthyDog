import {
  Controller,
  //Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { CreateSchoolDto } from '../../application/dto/create-school.dto';
import { CreateSchoolUseCase } from '../../application/use-cases/create-school.use-case';
import { School } from '../../domain/school';
import { DisplaySchoolDto } from '../../application/dto/display-school.dto';
//import { UpdateSchoolDto } from '../../application/dto/update-school.dto';

@Controller('schoolS')
export class SchoolController {
  constructor(private readonly createSchool: CreateSchoolUseCase) {}

  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    const school = new School(
      createSchoolDto.name,
      createSchoolDto.cnpj,
      createSchoolDto.address,
      createSchoolDto.phone,
      createSchoolDto.email,
    );
    const createSchool = this.createSchool.execute(school);
    const displaySchool = new DisplaySchoolDto(
      createSchool.getId(),
      createSchool.getName(),
      createSchool.getCnpj(),
      createSchool.getaddress(),
      createSchool.getPhone(),
      createSchool.getEmail(),
      createSchool.getCreatedAt(),
      createSchool.getUpdatedAt(),
    );
    return displaySchool;
  }

  // @Get()
  // findAll() {
  //   return this.schoolService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.schoolService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
  //   return this.schoolService.update(+id, updateSchoolDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.schoolService.remove(+id);
  // }
}
