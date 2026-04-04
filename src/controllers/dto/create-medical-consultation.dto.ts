import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export default class CreateMedicalConsultationDto {
  @IsNumber({}, { message: "guideDogId must be a number" })
  @Min(1, { message: "guideDogId must be a positive integer" })
  guideDogId: number;

  @IsOptional()
  @IsNumber({}, { message: "userId must be a number" })
  @Min(1, { message: "userId must be a positive integer" })
  userId: number | null | undefined;

  @IsNotEmpty({ message: "consultationDate is required" })
  @IsDateString(
    {},
    { message: "consultationDate must be an ISO 8601 date string" },
  )
  consultationDate: Date;

  @IsString({ message: "veterinarianCrmv must be a string" })
  veterinarianCrmv: string;

  @IsString({ message: "veterinarianName must be a string" })
  veterinarianName?: string;

  @IsOptional()
  @IsString({ message: "consultationNotes must be a string" })
  consultationNotes?: string | null | undefined;

  constructor(
    guideDogId: number,
    userId: number | null | undefined,
    consultationDate: Date,
    veterinarianCrmv: string,
    veterinarianName: string,
    consultationNotes: string | null | undefined,
  ) {
    this.guideDogId = guideDogId;
    this.userId = userId || null;
    this.consultationDate = consultationDate;
    this.veterinarianCrmv = veterinarianCrmv;
    this.veterinarianName = veterinarianName;
    this.consultationNotes = consultationNotes || null;
  }
}
