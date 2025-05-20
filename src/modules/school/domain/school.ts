export class School {
  private id?: number;
  private name: string;
  private cnpj: string;
  private address: string;
  private phone: string;
  private email: string;
  private createdAt: Date;
  private updatedAt: Date;

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

  public getId(): number | undefined {
    return this.id;
  }

  public setId(id: number | undefined): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getCnpj(): string {
    return this.cnpj;
  }

  public setCnpj(cnpj: string): void {
    this.cnpj = cnpj;
  }

  public getaddress(): string {
    return this.address;
  }

  public setaddress(address: string): void {
    this.address = address;
  }

  public getPhone(): string {
    return this.phone;
  }

  public setPhone(phone: string): void {
    this.phone = phone;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
