import { Injectable } from '@nestjs/common';
import { GuideDog } from '../../domain/guide-dog';

@Injectable()
export class GuideDogRepository {
  constructor(private guideDogs: GuideDog[] = []) {
    // Constructor logic here
  }

  createGuideDog(guideDog: GuideDog): void {
    this.guideDogs.push(guideDog);
    console.log('Guide dog created:', this.guideDogs);
  }

  getAllGuideDogs(): GuideDog[] {
    return this.guideDogs;
  }

  getGuideDogById(id: number): GuideDog | undefined {
    return this.guideDogs.find((dog) => dog.getId() === id);
  }

  //   updateGuideDog(id: number, updatedGuideDog: GuideDog): void {
  //     const index = this.guideDogs.findIndex((dog) => dog.getId() === id);
  //     if (index !== -1) {
  //       this.guideDogs[index] = {
  //         ...this.guideDogs[index],
  //         ...updatedGuideDog,
  //       };
  //     }
  //   }

  deleteGuideDog(id: number): void {
    this.guideDogs = this.guideDogs.filter((dog) => dog.getId() !== id);
  }
}
