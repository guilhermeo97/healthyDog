import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsDateString,
  IsBoolean,
} from "class-validator";

export default class UpdateUserDto {
  @IsOptional()
  school?: number | null | undefined;

  @IsOptional()
  @IsString({ message: "Full name must be a string" })
  @MinLength(3, { message: "Full name must be at least 3 characters long" })
  fullName?: string | null | undefined;

  @IsOptional()
  @IsString({ message: "CPF must be a string" })
  @MinLength(11, { message: "CPF must be at least 11 characters long" })
  cpf?: string | null | undefined;

  @IsOptional()
  @IsDateString({}, { message: "Birth date must be an ISO 8601 date string" })
  birthDate?: Date | null | undefined;

  @IsOptional()
  @IsString({ message: "Access type must be a string" })
  acessType?: string | null | undefined;

  @IsOptional()
  @IsEmail({}, { message: "Invalid email format" })
  email?: string | null | undefined;

  @IsOptional()
  @IsString({ message: "Phone must be a string" })
  @MinLength(10, { message: "Phone must be at least 10 characters long" })
  phone?: string | null | undefined;

  @IsOptional()
  @IsString({ message: "Address must be a string" })
  @MinLength(5, { message: "Address must be at least 5 characters long" })
  address?: string | null | undefined;

  @IsOptional()
  @IsString({ message: "Password must be a string" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password?: string | null | undefined;

  @IsOptional()
  guideDog?: number | null | undefined;

  @IsOptional()
  @IsBoolean({ message: "State must be a boolean" })
  state?: boolean | null | undefined;

  constructor(
    school?: number,
    fullName?: string,
    cpf?: string,
    birthDate?: Date,
    acessType?: string,
    email?: string,
    phone?: string,
    address?: string,
    password?: string | null | undefined,
    guideDog?: number,
    state?: boolean,
  ) {
    this.school = school !== undefined ? school : null;
    this.fullName = fullName !== undefined ? fullName.trim() : null;
    this.cpf = cpf !== undefined ? cpf.trim() : null;
    this.birthDate = birthDate !== undefined ? birthDate : null;
    this.acessType = acessType !== undefined ? acessType.trim() : null;
    this.email = email !== undefined ? email.trim() : null;
    this.phone = phone !== undefined ? phone.trim() : null;
    this.address = address !== undefined ? address.trim() : null;
    this.password = password !== undefined ? password : null;
    this.guideDog = guideDog !== undefined ? guideDog : null;
    this.state = state !== undefined ? state : null;
  }
}
