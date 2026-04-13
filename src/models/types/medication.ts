export type MedicationType = "VACCINE" | "DEWORMER" | "ANTIPARASITIC";

export type Medication = {
  id?: number;
  guideDogId: number | null | undefined;
  userId: number | null | undefined;
  manufacturer: string | null | undefined;
  applicationDate: Date | null | undefined;
  expirationDate: Date | null | undefined;
  isMandatory: boolean | null | undefined;
  veterinarianCrmv: string | null | undefined;
  veterinarianName: string | null | undefined;
  medicationType: MedicationType | null | undefined;
  createdAt: Date | null | undefined;
  updatedAt: Date | null | undefined;
};

// id
// guideDogId
// userId
// manufacturer
// applicationDate
// expirationDate
// is_mandatoryn
// veterinarianCrmv
// veterinarianName
// medicationTypetionType
// createdAt
// updatedAt
