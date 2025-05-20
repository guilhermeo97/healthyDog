import { Injectable } from '@nestjs/common';
import { CreateGuideDogDto } from '../dto/create-guide-dog.dto';
import { GuideDog } from '../../domain/guide-dog';

@Injectable()
export class CreateDogUseCase {
  constructor() {
    // Constructor logic here
  }

  execute(guideDogDto: CreateGuideDogDto) {
    const guideDog = new GuideDog();
    console.log('CreateDogUseCase executed');
  }
}
