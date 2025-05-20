export class SchoolEntity {
  id?: number;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    cnpj: string,
    address: string,
    phone: string,
    email: string,
    id?: number,
  ) {
    this.id = id || undefined;
    this.name = name;
    this.cnpj = cnpj;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
