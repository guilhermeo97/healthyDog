import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export default class UpdateMedicalConsultationDto {
  @IsOptional()
  @IsNumber({}, { message: "guideDogId must be a number" })
  @Min(1, { message: "guideDogId must be a positive integer" })
  guideDogId?: number | null | undefined;

  @IsOptional()
  @IsNumber({}, { message: "userId must be a number" })
  @Min(1, { message: "userId must be a positive integer" })
  userId?: number | null | undefined;

  @IsOptional()
  @IsDateString(
    {},
    { message: "consultationDate must be an ISO 8601 date string" },
  )
  consultationDate?: Date | null | undefined;

  @IsOptional()
  @IsString({ message: "veterinarianCrmv must be a string" })
  veterinarianCrmv?: string | null | undefined;

  @IsOptional()
  @IsString({ message: "veterinarianName must be a string" })
  veterinarianName?: string | null | undefined;

  @IsOptional()
  @IsString({ message: "consultationNotes must be a string" })
  consultationNotes?: string | null | undefined;

  constructor(
    guideDogId?: number | null | undefined,
    userId?: number | null | undefined,
    consultationDate?: Date | null | undefined,
    veterinarianCrmv?: string | null | undefined,
    veterinarianName?: string | null | undefined,
    consultationNotes?: string | null | undefined,
  ) {
    this.guideDogId =
      guideDogId !== undefined && guideDogId !== null ? guideDogId : null;
    this.userId = userId !== undefined && userId !== null ? userId : null;
    this.consultationDate =
      consultationDate !== undefined && consultationDate !== null
        ? consultationDate
        : null;
    this.veterinarianCrmv =
      veterinarianCrmv !== undefined && veterinarianCrmv !== null
        ? veterinarianCrmv
        : null;
    this.veterinarianName =
      veterinarianName !== undefined && veterinarianName !== null
        ? veterinarianName
        : null;
    this.consultationNotes =
      consultationNotes !== undefined && consultationNotes !== null
        ? consultationNotes
        : null;
  }
}
