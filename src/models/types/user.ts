import type { School } from "./school";

export type User = {
  id?: number;
  school: number;
  fullName: string;
  cpf: string;
  birthDate: Date;
  acessType: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  guideDog?: number | null | undefined;
  state: boolean;
  created: Date;
};

// id,
// school,
// fullName,
// cpf,
// birthDate
// acessType,
// email,
// phone,
// password,
// guideDog,
// state,
// created
