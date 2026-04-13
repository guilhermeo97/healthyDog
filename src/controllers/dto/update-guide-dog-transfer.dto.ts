import {
  IsOptional,
  IsNumber,
  IsDateString,
  IsString,
  MinLength,
} from "class-validator";

export default class UpdateGuideDogTransferDto {
  @IsOptional()
  @IsNumber({}, { message: "Guide dog ID must be a number" })
  guideDogId?: number | null | undefined;

  @IsOptional()
  @IsNumber({}, { message: "User ID must be a number" })
  userId?: number | null | undefined;

  @IsOptional()
  @IsDateString({}, { message: "Start date must be an ISO 8601 date string" })
  startDate?: Date | null | undefined;

  @IsOptional()
  @IsDateString({}, { message: "End date must be an ISO 8601 date string" })
  endDate?: Date | null | undefined;

  @IsOptional()
  @IsString({ message: "Transfer reason must be a string" })
  @MinLength(1, {
    message: "Transfer reason must be at least 1 character long",
  })
  transferReason?: string | null | undefined;

  constructor(
    guideDogId?: number,
    userId?: number,
    startDate?: Date,
    endDate?: Date | null | undefined,
    transferReason?: string | null | undefined,
  ) {
    this.guideDogId = guideDogId !== undefined ? guideDogId : null;
    this.userId = userId !== undefined ? userId : null;
    this.startDate = startDate !== undefined ? startDate : null;
    this.endDate = endDate !== undefined ? endDate : null;
    this.transferReason = transferReason?.trim() || null;
  }
}
