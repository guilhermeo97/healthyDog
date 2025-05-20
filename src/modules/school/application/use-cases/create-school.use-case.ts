import { Injectable } from '@nestjs/common';
import { School } from '../../domain/school';

@Injectable()
export class CreateSchoolUseCase {
  constructor() {
    // Constructor logic if needed
  }

  execute(schoolData: School): School {
    // Logic to create a school
    // For example, you might save the school data to a database
    console.log('Creating school with data:', schoolData);
    return schoolData;
  }
}
