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
  birthDate: string;

  @IsNotEmpty({ message: "Access type is required" })
  @IsString({ message: "Access type must be a string" })
  acessType: string;

  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsNotEmpty({ message: "Phone is required" })
  @IsString({ message: "Phone must be a string" })
  @MinLength(10, { message: "Phone must be at least 10 characters long" })
  phone: string;

  @IsNotEmpty({ message: "Password is required" })
  @IsString({ message: "Password must be a string" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;

  @IsOptional()
  guideDog?: number;

  constructor(
    school: number,
    fullName: string,
    cpf: string,
    birthDate: string,
    acessType: string,
    email: string,
    phone: string,
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
    this.password = password;
    if (guideDog !== undefined) this.guideDog = guideDog;
  }
}
