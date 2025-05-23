import { Injectable } from '@nestjs/common';
import { SchoolEntity } from '../entities/school.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from '../../domain/school';

@Injectable()
export class SchoolRepository {
  constructor(
    @InjectRepository(SchoolEntity)
    private readonly schoolRepository: Repository<SchoolEntity>,
  ) {}

  async create(school: School): Promise<SchoolEntity> {
    const schoolEntity = SchoolEntity.toEntity(school);
    return await this.schoolRepository.save(schoolEntity);
  }
}
