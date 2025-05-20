import { GuideDog } from 'src/modules/guide-dog/domain/guide-dog';
import { School } from 'src/modules/school/domain/school';

export class User {
  private id?: number;
  private name: string;
  private email: string;
  private password: string;
  private school: School;
  private address: string;
  private cpf: string;
  private birthDate: Date;
  private accessType: string;
  private phone: string;
  private guideDog?: GuideDog;
  private active: boolean;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    name: string,
    email: string,
    password: string,
    school: School,
    cpf: string,
    address: string,
    birthDate: Date,
    accessType: string,
    phone: string,
    guideDog?: GuideDog,
    id?: number,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.school = school;
    this.address = address;
    this.cpf = cpf;
    this.birthDate = birthDate;
    this.accessType = accessType;
    this.phone = phone;
    this.guideDog = guideDog;
    this.active = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.id = id || undefined;
  }

  getId(): number | undefined {
    return this.id;
  }

  setId(id: number | undefined): void {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getAddress(): string {
    return this.address;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  getSchool(): School {
    return this.school;
  }

  setSchool(school: School): void {
    this.school = school;
  }

  getCpf(): string {
    return this.cpf;
  }

  setCpf(cpf: string): void {
    this.cpf = cpf;
  }

  getBirthDate(): Date {
    return this.birthDate;
  }

  setBirthDate(birthDate: Date): void {
    this.birthDate = birthDate;
  }

  getAccessType(): string {
    return this.accessType;
  }

  setAccessType(accessType: string): void {
    this.accessType = accessType;
  }

  getPhone(): string {
    return this.phone;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  getGuideDog(): GuideDog | undefined {
    return this.guideDog;
  }

  setGuideDog(guideDog: GuideDog | undefined): void {
    this.guideDog = guideDog;
  }

  isActive(): boolean {
    return this.active;
  }

  setActive(active: boolean): void {
    this.active = active;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
