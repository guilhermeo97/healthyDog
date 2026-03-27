import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsDateString,
  IsOptional,
} from "class-validator";

export default class CreateUserDto {
  @IsNotEmpty({ message: "School ID is required" })
  school: number;

  @IsNotEmpty({ message: "Full name is required" })
  @IsString({ message: "Full name must be a string" })
  @MinLength(3, { message: "Full name must be at least 3 characters long" })
  fullName: string;

  @IsNotEmpty({ message: "CPF is required" })
  @IsString({ message: "CPF must be a string" })
  @MinLength(11, { message: "CPF must be at least 11 characters long" })
  cpf: string;

  @IsNotEmpty({ message: "Birth date is required" })
  @IsDateString({}, { message: "Birth date must be an ISO 8601 date string" })
  birthDate: Date;

  @IsNotEmpty({ message: "Access type is required" })
  @IsString({ message: "Access type must be a string" })
  acessType: string;

  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsNotEmpty({ message: "Phone is required" })
  @IsString({ message: "Phone must be a string" })
  @MinLength(10, { message: "Phone must be at least 10 characters long" })
  phone: string;

  @IsString({ message: "Address must be a string" })
  @MinLength(5, { message: "Address must be at least 5 characters long" })
  address: string;

  @IsNotEmpty({ message: "Password is required" })
  @IsString({ message: "Password must be a string" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;

  @IsOptional()
  guideDog?: number | undefined | null;

  constructor(
    school: number,
    fullName: string,
    cpf: string,
    birthDate: Date,
    acessType: string,
    email: string,
    phone: string,
    address: string,
    password: string,
    guideDog?: number,
  ) {
    this.school = school;
    this.fullName = fullName.trim();
    this.cpf = cpf.trim();
    this.birthDate = birthDate;
    this.acessType = acessType.trim();
    this.email = email.trim();
    this.phone = phone.trim();
    this.address = address.trim();
    this.password = password;
    this.guideDog = guideDog === undefined ? null : guideDog;
  }
}
