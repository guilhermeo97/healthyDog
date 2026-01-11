import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { IsCNPJ } from "../../utils/validateCnpj";

export default class CreateSchoolDto {
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  @MinLength(3, { message: "Name must be at least 3 characters long" })
  name: string;

  @IsNotEmpty({ message: "CNPJ is required" })
  @IsString({ message: "CNPJ must be a string" })
  @MinLength(14, { message: "CNPJ must be at least 14 characters long" })
  @IsCNPJ({ message: "CNPJ must be longer than name" })
  cnpj: string;

  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsNotEmpty({ message: "Phone is required" })
  @IsString({ message: "Phone must be a string" })
  @MinLength(10, { message: "Phone must be at least 10 characters long" })
  phone: string;

  @IsNotEmpty({ message: "Address is required" })
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
