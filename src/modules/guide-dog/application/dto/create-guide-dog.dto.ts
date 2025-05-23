import { User } from 'src/modules/user/domain/user';

export class CreateGuideDogDto {
  id: number;
  name: string;
  gender: string;
  breed: string;
  weight: number;
  birthDate: Date;
  deathDate?: Date;
  retirementDate?: Date;
  ownerUser: User;
  createdAt: Date;
  updatedAt: Date;
}
