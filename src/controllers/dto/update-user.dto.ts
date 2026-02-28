import { IsEmail, IsOptional, IsString, MinLength, IsDateString, IsBoolean } from "class-validator";

export default class UpdateUserDto {
  @IsOptional()
  school?: number;

  @IsOptional()
  @IsString({ message: "Full name must be a string" })
  @MinLength(3, { message: "Full name must be at least 3 characters long" })
  fullName?: string;

  @IsOptional()
  @IsString({ message: "CPF must be a string" })
  @MinLength(11, { message: "CPF must be at least 11 characters long" })
  cpf?: string;

  @IsOptional()
  @IsDateString({}, { message: "Birth date must be an ISO 8601 date string" })
  birthDate?: string;

  @IsOptional()
  @IsString({ message: "Access type must be a string" })
  acessType?: string;

  @IsOptional()
  @IsEmail({}, { message: "Invalid email format" })
  email?: string;

  @IsOptional()
  @IsString({ message: "Phone must be a string" })
  @MinLength(10, { message: "Phone must be at least 10 characters long" })
  phone?: string;

  @IsOptional()
  @IsString({ message: "Password must be a string" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password?: string;

  @IsOptional()
  guideDog?: number;

  @IsOptional()
  @IsBoolean({ message: "State must be a boolean" })
  state?: boolean;

  constructor(
    school?: number,
    fullName?: string,
    cpf?: string,
    birthDate?: string,
    acessType?: string,
    email?: string,
    phone?: string,
    password?: string,
    guideDog?: number,
    state?: boolean
  ) {
    if (school !== undefined) this.school = school;
    if (fullName !== undefined) this.fullName = fullName.trim();
    if (cpf !== undefined) this.cpf = cpf.trim();
    if (birthDate !== undefined) this.birthDate = birthDate;
    if (acessType !== undefined) this.acessType = acessType.trim();
    if (email !== undefined) this.email = email.trim();
    if (phone !== undefined) this.phone = phone.trim();
    if (password !== undefined) this.password = password;
    if (guideDog !== undefined) this.guideDog = guideDog;
    if (state !== undefined) this.state = state;
  }
}
