import { SchoolEntity } from 'src/modules/school/infra/entities/school.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class GuideDogEntity {
  id: number;
  name: string;
  school: SchoolEntity;
  gender: string;
  breed: string;
  weight: number;
  birthDate: Date;
  deathDate?: Date;
  retirementDate?: Date;
  ownerUser: UserEntity | undefined;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    school: SchoolEntity,
    gender: string,
    breed: string,
    weight: number,
    birthDate: Date,
    createdAt: Date,
    updatedAt: Date,
    id?: number,
    deathDate?: Date,
    retirementDate?: Date,
    ownerUser?: UserEntity,
  ) {
    this.name = name;
    this.school = school;
    this.breed = breed;
    this.gender = gender;
    this.weight = weight;
    this.birthDate = birthDate;
    this.deathDate = deathDate;
    this.retirementDate = retirementDate;
    this.ownerUser = ownerUser || undefined;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = id || 0;
  }
}
