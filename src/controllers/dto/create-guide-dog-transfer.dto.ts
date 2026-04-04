import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export default class CreateGuideDogTransferDto {
  @IsNotEmpty({ message: "Guide dog ID is required" })
  @IsNumber({}, { message: "Guide dog ID must be a number" })
  guideDogId: number;

  @IsNotEmpty({ message: "User ID is required" })
  @IsNumber({}, { message: "User ID must be a number" })
  userId: number;

  @IsNotEmpty({ message: "Start date is required" })
  @IsDateString({}, { message: "Start date must be an ISO 8601 date string" })
  startDate: Date;

  @IsOptional()
  @IsDateString({}, { message: "End date must be an ISO 8601 date string" })
  endDate?: Date | null | undefined;

  @IsString({ message: "Transfer reason must be a string" })
  @MinLength(1, {
    message: "Transfer reason must be at least 1 character long",
  })
  transferReason: string;

  constructor(
    guideDogId: number,
    userId: number,
    startDate: Date,
    transferReason: string,
    endDate?: Date | null | undefined,
  ) {
    this.guideDogId = guideDogId;
    this.userId = userId;
    this.startDate = startDate;
    this.endDate = endDate || null;
    this.transferReason = transferReason?.trim();
  }
}
