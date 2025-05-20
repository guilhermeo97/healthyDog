import { GuideDogEntity } from 'src/modules/guide-dog/infra/entity/guide-dog.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class MedicineEntity {
  id?: number;
  guideDog: GuideDogEntity;
  ownerUser: UserEntity;
  applicationDate: Date;
  expirationDate: Date;
  mandatory: boolean;
  veterinarianCRMV: string;
  veterinarianName: string;
  medicineType: string;
  medicineName: string;

  constructor(
    guideDog: GuideDogEntity,
    ownerUser: UserEntity,
    applicationDate: Date,
    expirationDate: Date,
    mandatory: boolean,
    veterinarianCRMV: string,
    veterinarianName: string,
    medicineType: string,
    medicineName: string,
    id?: number,
  ) {
    this.id = id || undefined;
    this.guideDog = guideDog;
    this.ownerUser = ownerUser;
    this.applicationDate = applicationDate;
    this.expirationDate = expirationDate;
    this.mandatory = mandatory;
    this.veterinarianCRMV = veterinarianCRMV;
    this.veterinarianName = veterinarianName;
    this.medicineType = medicineType;
    this.medicineName = medicineName;
  }
}
