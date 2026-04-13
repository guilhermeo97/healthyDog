import Database from "../database/database";
import type { User } from "./types/user";
import type { ResultSetHeader } from "mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader";

export default class UserModel {
  constructor() {}

  async create(user: User) {
    try {
      const query = await Database.query<ResultSetHeader>(
        "INSERT INTO users (school_id, name, cpf, birth_date, type_acess, email, phone, address, password, guidedog_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          user.school,
          user.fullName,
          user.cpf,
          user.birthDate,
          user.acessType,
          user.email,
          user.phone,
          user.address,
          user.password,
          user.guideDog,
        ],
      );
      const newUser = await this.getId(query.insertId);
      return newUser;
    } catch (error: unknown) {
      console.error("Database error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido no banco de dados");
    }
  }

  async getId(id: number) {
    try {
      const sql = "SELECT * FROM users WHERE id = ?";
      const query = await Database.query<User[]>(sql, [id]);
      if (query.length === 0) {
        return null;
      }
      const row = query[0];
      const mappedUser = this.mapRowToUser(row);
      return mappedUser;
    } catch (error: unknown) {
      console.error("Database error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido no banco de dados");
    }
  }

  async getAll(status: number) {
    try {
      let sql = "";
      let statusFilter = 3;
      if (status == 1 || status == 0) {
        sql = "SELECT * FROM users WHERE state = ?;";
        statusFilter = status;
      } else if (status == 3) {
        sql = "SELECT * FROM users;";
      }
      if (sql === "") {
        return [];
      }
      const query = await Database.query<User[]>(
        sql,
        statusFilter === 3 ? [] : [statusFilter],
      );
      if (query.length === 0) {
        return [];
      }
      const mappedUsers: User[] = query.map((user) => {
        return this.mapRowToUser(user);
      });
      return mappedUsers;
    } catch (error: unknown) {
      console.error("Database error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido no banco de dados");
    }
  }

  async update(user: Partial<User>) {
    try {
      const findUser = await this.getId(user.id!);
      if (!findUser) {
        return null;
      }
      findUser.school = user.school !== null ? user.school : findUser.school;
      findUser.fullName =
        user.fullName !== null ? user.fullName : findUser.fullName;
      findUser.cpf = user.cpf !== null ? user.cpf : findUser.cpf;
      findUser.birthDate =
        user.birthDate !== null ? user.birthDate : findUser.birthDate;
      findUser.acessType =
        user.acessType !== null ? user.acessType : findUser.acessType;
      findUser.email = user.email !== null ? user.email : findUser.email;
      findUser.phone = user.phone !== null ? user.phone : findUser.phone;
      findUser.address =
        user.address !== null ? user.address : findUser.address;
      findUser.address =
        user.address !== null ? user.address : findUser.address;
      findUser.password =
        user.password !== null ? user.password : findUser.password;
      findUser.guideDog =
        user.guideDog !== null ? user.guideDog : findUser.guideDog;
      findUser.state = user.state !== null ? user.state : findUser.state;
      const sql = `UPDATE users SET school_id = ?, name = ?, cpf = ?, birth_date = ?, type_acess = ?, email = ?, phone = ?, address = ?, password = ?, guidedog_id = ?, state = ? WHERE id = ?`;
      const query = await Database.query<ResultSetHeader>(sql, [
        findUser.school,
        findUser.fullName,
        findUser.cpf,
        findUser.birthDate,
        findUser.acessType,
        findUser.email,
        findUser.phone,
        findUser.address,
        findUser.password,
        findUser.guideDog,
        findUser.state,
        findUser.id,
      ]);

      if (query.affectedRows === 0) {
        return null;
      }

      const updatedUser = await this.getId(findUser.id!);
      return updatedUser;
    } catch (error: unknown) {
      console.error("Database error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido no banco de dados");
    }
  }

  async delete(id: number) {
    try {
      const findUser = await this.getId(id);
      if (!findUser) {
        return null;
      }
      const sql = "UPDATE users SET state = 0 WHERE id = ?";
      const query = await Database.query<ResultSetHeader>(sql, [id]);
      if (query.affectedRows === 0) {
        return null;
      }
      return true;
    } catch (error: unknown) {
      console.error("Database error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido no banco de dados");
    }
  }

  private mapRowToUser(row: any): User {
    return {
      id: row.id === undefined ? null : row.id,
      school: row.school_id === undefined ? null : row.school_id,
      fullName: row.name === undefined ? null : row.name,
      cpf: row.cpf === undefined ? null : row.cpf,
      birthDate: row.birth_date === undefined ? null : new Date(row.birth_date),
      acessType: row.type_acess === undefined ? null : row.type_acess,
      email: row.email === undefined ? null : row.email,
      phone: row.phone === undefined ? null : row.phone,
      address: row.address === undefined ? null : row.address,
      password: row.password === undefined ? null : row.password,
      guideDog: row.guidedog_id === undefined ? null : row.guidedog_id,
      state: row.state === 1 ? true : false,
      created: row.created === undefined ? null : new Date(row.created),
    };
  }
}
