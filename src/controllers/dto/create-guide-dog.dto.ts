import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  IsDateString,
  IsNumber,
  IsOptional,
  IsBoolean,
} from "class-validator";

export default class CreateGuideDogDto {
  @IsNotEmpty({ message: "School ID is required" })
  @IsNumber({}, { message: "School ID must be a number" })
  schoolId: number;

  @IsOptional()
  @IsNumber({}, { message: "User ID must be a number" })
  userId: number | null | undefined;

  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  @MinLength(1, { message: "Name must be at least 1 character long" })
  name: string;

  @IsNotEmpty({ message: "Gender is required" })
  @IsEnum(["M", "F"], { message: "Gender must be 'M' or 'F'" })
  gender: "M" | "F";

  @IsNotEmpty({ message: "Breed is required" })
  @IsString({ message: "Breed must be a string" })
  @MinLength(1, { message: "Breed must be at least 1 character long" })
  breed: string;

  @IsNotEmpty({ message: "Birth date is required" })
  @IsDateString({}, { message: "Birth date must be an ISO 8601 date string" })
  birthDate: Date;

  @IsOptional()
  @IsDateString({}, { message: "Death date must be an ISO 8601 date string" })
  deathDate?: Date | null | undefined;

  @IsOptional()
  @IsDateString(
    {},
    { message: "Retirement date must be an ISO 8601 date string" },
  )
  retirementDate?: Date | null | undefined;

  @IsNotEmpty({ message: "Weight is required" })
  @IsNumber({}, { message: "Weight must be a number" })
  weight: number;

  constructor(
    schoolId: number,
    userId: number | null | undefined,
    name: string,
    gender: "M" | "F",
    breed: string,
    birthDate: Date,
    deathDate?: Date | null | undefined,
    retirementDate?: Date | null | undefined,
    weight?: number,
  ) {
    this.schoolId = schoolId;
    this.userId = userId === undefined ? null : userId;
    this.name = name.trim();
    this.gender = gender;
    this.breed = breed.trim();
    this.birthDate = birthDate;
    this.deathDate = deathDate || null;
    this.retirementDate = retirementDate || null;
    this.weight = weight || 0;
  }
}
