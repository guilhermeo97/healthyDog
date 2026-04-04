export type MedicalConsultation = {
  id?: number;
  guideDogId: number | null | undefined;
  userId: number | null | undefined;
  consultationDate: Date | null | undefined;
  veterinarianCrmv: string | null | undefined;
  veterinarianName: string | null | undefined;
  consultationNotes: string | null | undefined;
  createdAt: Date | null | undefined;
  updatedAt: Date | null | undefined;
};
