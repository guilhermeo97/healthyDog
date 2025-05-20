import { School } from 'src/modules/school/domain/school';
import { User } from 'src/modules/user/domain/user';

export class GuideDog {
  private id: number;
  private name: string;
  private school: School;
  private gender: string;
  private breed: string;
  private weight: number;
  private birthDate: Date;
  private deathDate?: Date;
  private retirementDate?: Date;
  private ownerUser: User | undefined;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    name: string,
    school: School,
    gender: string,
    breed: string,
    weight: number,
    birthDate: Date,
    createdAt: Date,
    updatedAt: Date,
    id?: number,
    deathDate?: Date,
    retirementDate?: Date,
    ownerUser?: User,
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

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getSchool(): School {
    return this.school;
  }

  public setSchool(school: School): void {
    this.school = school;
  }

  public getGender(): string {
    return this.gender;
  }

  public setGender(gender: string): void {
    this.gender = gender;
  }

  public getBreed(): string {
    return this.breed;
  }

  public setBreed(breed: string): void {
    this.breed = breed;
  }

  public getWeight(): number {
    return this.weight;
  }

  public setWeight(weight: number): void {
    this.weight = weight;
  }

  public getBirthDate(): Date {
    return this.birthDate;
  }

  public setBirthDate(birthDate: Date): void {
    this.birthDate = birthDate;
  }

  public getDeathDate(): Date | undefined {
    return this.deathDate;
  }

  public setDeathDate(deathDate: Date | undefined): void {
    this.deathDate = deathDate;
  }

  public getRetirementDate(): Date | undefined {
    return this.retirementDate;
  }

  public setRetirementDate(retirementDate: Date | undefined): void {
    this.retirementDate = retirementDate;
  }

  public getOwnerUser(): User | undefined {
    if (!this.ownerUser) {
      return undefined;
    }
    return this.ownerUser;
  }

  public setOwnerUser(ownerUser: User): void {
    this.ownerUser = ownerUser;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
