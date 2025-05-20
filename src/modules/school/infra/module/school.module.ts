import { Module } from '@nestjs/common';
import { SchoolController } from '../../presentation/controllers/school.controller';
import { CreateSchoolUseCase } from '../../application/use-cases/create-school.use-case';

@Module({
  controllers: [SchoolController],
  providers: [CreateSchoolUseCase],
})
export class SchoolModule {}
