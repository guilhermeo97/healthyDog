import {
  IsOptional,
  IsString,
  MinLength,
  IsEnum,
  IsDateString,
  IsNumber,
  IsBoolean,
} from "class-validator";

export default class UpdateGuideDogDto {
  @IsOptional()
  @IsNumber({}, { message: "School ID must be a number" })
  schoolId?: number;

  @IsOptional()
  @IsNumber({}, { message: "User ID must be a number" })
  userId?: number;

  @IsOptional()
  @IsString({ message: "Name must be a string" })
  @MinLength(1, { message: "Name must be at least 1 character long" })
  name?: string;

  @IsOptional()
  @IsEnum(["M", "F"], { message: "Gender must be 'M' or 'F'" })
  gender?: "M" | "F";

  @IsOptional()
  @IsString({ message: "Breed must be a string" })
  @MinLength(1, { message: "Breed must be at least 1 character long" })
  breed?: string;

  @IsOptional()
  @IsDateString({}, { message: "Birth date must be an ISO 8601 date string" })
  birthDate?: string;

  @IsOptional()
  @IsDateString({}, { message: "Death date must be an ISO 8601 date string" })
  deathDate?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: "Retirement date must be an ISO 8601 date string" },
  )
  retirementDate?: string;

  @IsOptional()
  @IsNumber({}, { message: "Weight must be a number" })
  weight?: number;

  @IsOptional()
  @IsBoolean({ message: "State must be boolean" })
  state?: boolean;

  constructor(
    schoolId?: number,
    userId?: number,
    name?: string,
    gender?: "M" | "F",
    breed?: string,
    birthDate?: string,
    deathDate?: string,
    retirementDate?: string,
    weight?: number,
    state?: boolean,
  ) {
    if (schoolId !== undefined) this.schoolId = schoolId;
    if (userId !== undefined) this.userId = userId;
    if (name !== undefined) this.name = name.trim();
    if (gender !== undefined) this.gender = gender;
    if (breed !== undefined) this.breed = breed.trim();
    if (birthDate !== undefined) this.birthDate = birthDate;
    if (deathDate !== undefined) this.deathDate = deathDate;
    if (retirementDate !== undefined) this.retirementDate = retirementDate;
    if (weight !== undefined) this.weight = weight;
    if (state !== undefined) this.state = state;
  }
}
