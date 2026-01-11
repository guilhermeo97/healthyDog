import Database from "../database/database";
import type { User } from "./types/user";

export default class UserModel {
  async create(user: User) {
    try {
      const {
        school,
        fullName,
        cpf,
        birthDate,
        acessType,
        email,
        phone,
        password,
        guideDog,
        state,
      } = user;
      const query = await Database.query(
        "INSERT INTO users (school, full_name, cpf, birth_date, acess_type, email, phone, password, guide_dog, state, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          school,
          fullName,
          cpf,
          birthDate,
          acessType,
          email,
          phone,
          password,
          guideDog,
          state,
          new Date(),
        ]
      );
    } catch (error) {}
  }
}
