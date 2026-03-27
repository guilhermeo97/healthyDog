export type GuideDog = {
  id?: number;
  schoolId: number | null; // corresponds to id_escola
  userId: number | null | undefined; // corresponds to id_user
  name: string | null;
  gender: "M" | "F" | null;
  breed: string | null;
  birthDate: Date | null;
  deathDate: Date | null | undefined;
  retirementDate: Date | null | undefined;
  weight: number | null;
  state: boolean | null;
  created: Date | null;
};

// id,
// schoolId,
// userId,
// name,
// gender
// breed,
// birthDate,
// deathDate,
// retirementDate,
// weight,
// state,
// created
