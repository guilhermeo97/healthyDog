export type GuideDog = {
  id?: number;
  schoolId: number | null | undefined; // corresponds to id_escola
  userId: number | null | undefined; // corresponds to id_user
  name: string | null | undefined;
  gender: "M" | "F" | null | undefined;
  breed: string | null | undefined;
  birthDate: Date | null | undefined;
  deathDate: Date | null | undefined;
  retirementDate: Date | null | undefined;
  weight: number | null | undefined;
  state: boolean | null | undefined;
  created: Date | null | undefined;
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
