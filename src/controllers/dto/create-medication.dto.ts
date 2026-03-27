import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import type { MedicationType } from "../../models/types/medication";

export default class CreateMedicationDto {
  @IsNumber({}, { message: "guideDogId must be a number" })
  @Min(1, { message: "guideDogId must be a positive integer" })
  guideDogId: number;
  @IsOptional()
  @IsNumber({}, { message: "userId must be a number" })
  @Min(1, { message: "userId must be a positive integer" })
  userId: number | null;
  @IsString({ message: "manufacturer must be a string" })
  manufacturer: string;
  @IsDateString({}, { message: "applicationDate must be a valid date string" })
  applicationDate: Date;
  @IsOptional()
  @IsDateString({}, { message: "expirationDate must be a valid date string" })
  expirationDate: Date | null | undefined;
  @IsBoolean({ message: "isMandatory must be a boolean" })
  isMandatory: boolean;
  @IsString({ message: "veterinarianCrmv must be a string" })
  veterinarianCrmv: string;
  @IsString({ message: "veterinarianName must be a string" })
  veterinarianName: string;
  @IsEnum(["VACCINE", "DEWORMER", "ANTIPARASITIC"], {
    message: "medicationType must be one of: VACCINE, DEWORMER, ANTIPARASITIC",
  })
  medicationType: MedicationType;

  constructor(
    guideDogId: number,
    userId: number | null,
    manufacturer: string,
    applicationDate: Date,
    expirationDate: Date | null | undefined,
    isMandatory: boolean,
    veterinarianCrmv: string,
    veterinarianName: string,
    medicationType: MedicationType,
  ) {
    this.guideDogId = guideDogId;
    this.userId = userId || null;
    this.manufacturer = manufacturer;
    this.applicationDate = applicationDate;
    this.expirationDate = expirationDate || null;
    this.isMandatory = isMandatory;
    this.veterinarianCrmv = veterinarianCrmv;
    this.veterinarianName = veterinarianName;
    this.medicationType = medicationType;
  }
}
