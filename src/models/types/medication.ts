export type MedicationType = "VACCINE" | "DEWORMER" | "ANTIPARASITIC";

export type Medication = {
  id?: number;
  guideDogId: number | null;
  userId: number | null | undefined;
  manufacturer: string | null;
  applicationDate: Date | null;
  expirationDate: Date | null | undefined;
  isMandatory: boolean | null;
  veterinarianCrmv: string | null;
  veterinarianName: string | null;
  medicationType: MedicationType | null;
  createdAt: Date;
  updatedAt: Date;
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
