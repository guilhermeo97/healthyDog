export class DisplaySchoolDto {
  id: number | undefined;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number | undefined,
    name: string,
    cnpj: string,
    address: string,
    phone: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.cnpj = cnpj;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
