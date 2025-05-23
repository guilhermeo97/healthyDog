import { Module } from '@nestjs/common';
import { SchoolController } from '../../presentation/controllers/school.controller';
import { CreateSchoolUseCase } from '../../application/use-cases/create-school.use-case';
import { SchoolEntity } from '../entities/school.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolEntity])],
  controllers: [SchoolController],
  providers: [CreateSchoolUseCase],
})
export class SchoolModule {}
