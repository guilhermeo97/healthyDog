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
export default class UpdateMedicationDto {
  @IsOptional()
  @IsNumber({}, { message: "guideDogId must be a number" })
  @Min(1, { message: "guideDogId must be a positive integer" })
  guideDogId: number | undefined | null;
  @IsOptional()
  @IsNumber({}, { message: "userId must be a number" })
  @Min(1, { message: "userId must be a positive integer" })
  userId: number | null | undefined | null;
  @IsOptional()
  @IsString({ message: "manufacturer must be a string" })
  manufacturer: string | undefined | null;
  @IsOptional()
  @IsDateString({}, { message: "applicationDate must be a valid date string" })
  applicationDate: Date | undefined | null;
  @IsOptional()
  @IsDateString({}, { message: "expirationDate must be a valid date string" })
  expirationDate: Date | null | undefined | null;
  @IsOptional()
  @IsBoolean({ message: "isMandatory must be a boolean" })
  isMandatory: boolean | undefined | null;
  @IsOptional()
  @IsString({ message: "veterinarianCrmv must be a string" })
  veterinarianCrmv: string | undefined | null;
  @IsOptional()
  @IsString({ message: "veterinarianName must be a string" })
  veterinarianName: string | undefined | null;
  @IsOptional()
  @IsEnum(["VACCINE", "DEWORMER", "ANTIPARASITIC"], {
    message: "medicationType must be one of: VACCINE, DEWORMER, ANTIPARASITIC",
  })
  medicationType: MedicationType | undefined | null;

  constructor(
    guideDogId?: number | undefined | null,
    userId?: number | null | undefined | null,
    manufacturer?: string | undefined | null,
    applicationDate?: Date | undefined | null,
    expirationDate?: Date | null | undefined | null,
    isMandatory?: boolean | undefined | null,
    veterinarianCrmv?: string | undefined | null,
    veterinarianName?: string | undefined | null,
    medicationType?: MedicationType | undefined | null,
  ) {
    this.guideDogId = guideDogId || null;
    this.userId = userId || null;
    this.manufacturer = manufacturer || null;
    this.applicationDate = applicationDate || null;
    this.expirationDate = expirationDate || null;
    this.isMandatory = isMandatory || null;
    this.veterinarianCrmv = veterinarianCrmv || null;
    this.veterinarianName = veterinarianName || null;
    this.medicationType = medicationType || null;
  }
}
