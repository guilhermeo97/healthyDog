export type GuideDog = {
  id?: number;
  schoolId: number; // corresponds to id_escola
  userId: number; // corresponds to id_user
  name: string;
  gender: "M" | "F";
  breed: string;
  birthDate: Date;
  deathDate?: Date;
  retirementDate?: Date;
  weight: number;
  state?: boolean;
  created: Date;
};
