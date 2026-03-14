import Database from "../database/database";
import type { User } from "./types/user";

export default class UserModel {
  constructor() {}
  async create(user: User) {
    try {
      const query = await Database.query(
        "INSERT INTO users (school_id, name, cpf, birth_date, type_acess, email, phone, address, password, guidedog_id, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
          new Date(),
        ],
      );
      return query;
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  async getId(id: number) {
    try {
      const sql = "SELECT * FROM users WHERE id = ?";
      const query = await Database.query(sql, [id.toString()]);
      if (query.rows.length === 0) {
        return null;
      }
      const row = query.rows[0];

      const user: User = {
        id: row.id,
        school: row.school_id,
        fullName: row.name,
        cpf: row.cpf,
        birthDate: row.birth_date,
        acessType: row.type_acess,
        email: row.email,
        phone: row.phone,
        address: row.address,
        password: row.password,
        guideDog: row.guidedog_id ? row.guidedog_id : null,
        state: row.state === 1 ? true : false,
        created: row.created,
      };

      return user;
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error}`);
    }
  }

  async update(user: Partial<User>) {
    try {
      const findId: User | null = await this.getId(user.id!);
      if (!findId) {
        return null;
      }
      findId.school = (user.school as any) || findId.school;
      findId.fullName = user.fullName || findId.fullName;
      findId.cpf = user.cpf || findId.cpf;
      findId.birthDate = (user.birthDate as any) || findId.birthDate;
      findId.acessType = user.acessType || findId.acessType;
      findId.email = user.email || findId.email;
      findId.phone = user.phone || findId.phone;
      findId.address = user.address || findId.address;
      findId.password = user.password || findId.password;
      findId.guideDog =
        findId.guideDog === null && user.guideDog !== undefined
          ? user.guideDog
          : findId.guideDog;
      findId.state = user.state !== undefined ? user.state : findId.state;

      const sql = `UPDATE users SET school_id = ?, name = ?, cpf = ?, birth_date = ?, type_acess = ?, email = ?, phone = ?, address = ?, password = ?, guidedog_id = ?, state = ? WHERE id = ?`;
      const query = await Database.query(sql, [
        findId.school,
        findId.fullName,
        findId.cpf,
        findId.birthDate,
        findId.acessType,
        findId.email,
        findId.phone,
        findId.address,
        findId.password,
        findId.guideDog,
        findId.state ? 1 : 0,
        findId.id!.toString(),
      ]);

      if (query.rows.affectedRows === 0) {
        return null;
      }

      const updatedUser = await this.getId(findId.id!);
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user: ${error}`);
    }
  }

  async getAll(status: number) {
    try {
      let sql = "";
      if (status == 1 || status == 0) {
        sql = "SELECT * FROM users WHERE state = ?;";
      } else if (status == 3) {
        sql = "SELECT * FROM users;";
      }
      const query = await Database.query(sql, [status]);
      const rows = query.rows;

      if (rows.length === 0) {
        return null;
      }
      const users: User[] = rows.map((user) => {
        const state = user.state === 1 ? true : false;
        return {
          id: user.id,
          school: user.school,
          fullName: user.full_name,
          cpf: user.cpf,
          birthDate: user.birth_date,
          acessType: user.acess_type,
          email: user.email,
          phone: user.phone,
          password: user.password,
          guideDog: user.guide_dog === 1 ? true : false,
          state: state,
          created: user.created,
        };
      });
      return rows;
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }

  async delete(id: number) {
    try {
      const findUser = await this.getId(id);
      if (!findUser) {
        return null;
      }
      const sql = "UPDATE users SET state = 0 WHERE id = ?";
      const query = await Database.query(sql, [id.toString()]);
      if (query.rows.affectedRows === 0) {
        return null;
      }
      return true;
    } catch (error) {
      throw new Error(`Error deleting user: ${error}`);
    }
  }
}
