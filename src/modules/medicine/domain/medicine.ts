import { GuideDog } from 'src/modules/guide-dog/domain/guide-dog';
import { User } from 'src/modules/user/domain/user';

export class Medicine {
  private id?: number;
  private guideDog: GuideDog;
  private ownerUser: User;
  private applicationDate: Date;
  private expirationDate: Date;
  private mandatory: boolean;
  private veterinarianCRMV: string;
  private veterinarianName: string;
  private medicineType: string;
  private medicineName: string;

  constructor(
    guideDog: GuideDog,
    ownerUser: User,
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
  public getId(): number | undefined {
    return this.id;
  }

  public setId(id: number | undefined): void {
    this.id = id;
  }

  public getGuideDog(): GuideDog {
    return this.guideDog;
  }

  public setGuideDog(guideDog: GuideDog): void {
    this.guideDog = guideDog;
  }

  public getOwnerUser(): User {
    return this.ownerUser;
  }

  public setOwnerUser(ownerUser: User): void {
    this.ownerUser = ownerUser;
  }

  public getApplicationDate(): Date {
    return this.applicationDate;
  }

  public setApplicationDate(applicationDate: Date): void {
    this.applicationDate = applicationDate;
  }

  public getExpirationDate(): Date {
    return this.expirationDate;
  }

  public setExpirationDate(expirationDate: Date): void {
    this.expirationDate = expirationDate;
  }

  public isMandatory(): boolean {
    return this.mandatory;
  }

  public setMandatory(mandatory: boolean): void {
    this.mandatory = mandatory;
  }

  public getVeterinarianCRMV(): string {
    return this.veterinarianCRMV;
  }

  public setVeterinarianCRMV(veterinarianCRMV: string): void {
    this.veterinarianCRMV = veterinarianCRMV;
  }

  public getVeterinarianName(): string {
    return this.veterinarianName;
  }

  public setVeterinarianName(veterinarianName: string): void {
    this.veterinarianName = veterinarianName;
  }

  public getMedicineType(): string {
    return this.medicineType;
  }

  public setMedicineType(medicineType: string): void {
    this.medicineType = medicineType;
  }

  public getMedicineName(): string {
    return this.medicineName;
  }

  public setMedicineName(medicineName: string): void {
    this.medicineName = medicineName;
  }
}
