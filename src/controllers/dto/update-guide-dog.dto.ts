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
  schoolId?: number | null | undefined;

  @IsOptional()
  @IsNumber({}, { message: "User ID must be a number" })
  userId?: number | null | undefined;

  @IsOptional()
  @IsString({ message: "Name must be a string" })
  @MinLength(1, { message: "Name must be at least 1 character long" })
  name?: string | null | undefined;

  @IsOptional()
  @IsEnum(["M", "F"], { message: "Gender must be 'M' or 'F'" })
  gender?: "M" | "F" | null | undefined;

  @IsOptional()
  @IsString({ message: "Breed must be a string" })
  @MinLength(1, { message: "Breed must be at least 1 character long" })
  breed?: string | null | undefined;

  @IsOptional()
  @IsDateString({}, { message: "Birth date must be an ISO 8601 date string" })
  birthDate?: Date | null | undefined;

  @IsOptional()
  @IsDateString({}, { message: "Death date must be an ISO 8601 date string" })
  deathDate?: Date | null | undefined;

  @IsOptional()
  @IsDateString(
    {},
    { message: "Retirement date must be an ISO 8601 date string" },
  )
  retirementDate?: Date | null | undefined;

  @IsOptional()
  @IsNumber({}, { message: "Weight must be a number" })
  weight?: number | null | undefined;

  @IsOptional()
  @IsBoolean({ message: "State must be boolean" })
  state?: boolean | null | undefined;

  constructor(
    schoolId?: number,
    userId?: number,
    name?: string,
    gender?: "M" | "F" | null | undefined,
    breed?: string,
    birthDate?: Date,
    deathDate?: Date | null | undefined,
    retirementDate?: Date | null | undefined,
    weight?: number,
    state?: boolean,
  ) {
    this.schoolId = schoolId === undefined ? null : schoolId;
    this.userId = userId === undefined ? null : userId;
    this.name = name === undefined ? null : name.trim();
    this.gender = gender === undefined ? null : gender;
    this.breed = breed === undefined ? null : breed.trim();
    this.birthDate = birthDate === undefined ? null : birthDate;
    this.deathDate = deathDate === undefined ? null : deathDate;
    this.retirementDate = retirementDate === undefined ? null : retirementDate;
    this.weight = weight === undefined ? null : weight;
    this.state = state === undefined ? null : state;
  }
}
