import { IsEmail, IsOptional, IsString, Min, MinLength } from "class-validator";
import { IsCNPJ } from "../../utils/validateCnpj";

export default class UpdateSchoolDto {
  @IsOptional()
  @IsString({ message: "Name must be a string" })
  @MinLength(5, { message: "Name must be at least 3 characters long" })
  name: string;

  @IsOptional()
  @IsString({ message: "CNPJ must be a string" })
  @MinLength(14, { message: "CNPJ must be at least 14 characters long" })
  @IsCNPJ({ message: "CNPJ must be longer than name" })
  cnpj: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString({ message: "Phone must be a string" })
  @MinLength(10, { message: "Phone must be at least 10 characters long" })
  phone: string;

  @IsOptional()
  @IsString({ message: "Address must be a string" })
  @MinLength(5, { message: "Address must be at least 5 characters long" })
  address: string;

  constructor(
    name: string,
    cnpj: string,
    email: string,
    phone: string,
    address: string
  ) {
    this.name = name.trim();
    this.cnpj = cnpj.trim();
    this.email = email.trim();
    this.phone = phone.trim();
    this.address = address.trim();
  }
}
