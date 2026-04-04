export type GuideDogTransfer = {
  id?: number;
  guideDogId: number | null | undefined;
  userId: number | null | undefined;
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
  transferReason: string | null | undefined;
  createdAt: Date;
  updatedAt: Date;
};
