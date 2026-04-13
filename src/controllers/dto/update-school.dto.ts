import { IsEmail, IsOptional, IsString, Min, MinLength } from "class-validator";
import { IsCNPJ } from "../../utils/validateCnpj";

export default class UpdateSchoolDto {
  @IsOptional()
  @IsString({ message: "Name must be a string" })
  @MinLength(5, { message: "Name must be at least 3 characters long" })
  name: string | undefined | null;

  @IsOptional()
  @IsString({ message: "CNPJ must be a string" })
  @MinLength(14, { message: "CNPJ must be at least 14 characters long" })
  @IsCNPJ({ message: "CNPJ must be longer than name" })
  cnpj: string | undefined | null;

  @IsOptional()
  @IsEmail()
  email: string | undefined | null;

  @IsOptional()
  @IsString({ message: "Phone must be a string" })
  @MinLength(10, { message: "Phone must be at least 10 characters long" })
  phone: string | undefined | null;

  @IsOptional()
  @IsString({ message: "Address must be a string" })
  @MinLength(5, { message: "Address must be at least 5 characters long" })
  address: string | undefined | null;

  @IsOptional()
  state: boolean | undefined | null;

  constructor(
    name?: string,
    cnpj?: string,
    email?: string,
    phone?: string,
    address?: string,
    state?: boolean,
  ) {
    this.name = name !== undefined ? name.trim() : null;
    this.cnpj = cnpj !== undefined ? cnpj.trim() : null;
    this.email = email !== undefined ? email.trim() : null;
    this.phone = phone !== undefined ? phone.trim() : null;
    this.address = address !== undefined ? address.trim() : null;
    this.state = state !== undefined ? state : null;
  }
}
