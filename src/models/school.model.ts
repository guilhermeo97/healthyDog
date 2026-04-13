import type { School } from "./types/school";
import Database from "../database/database";
import type { ResultSetHeader } from "mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader";

export default class SchoolModel {
  constructor() {}

  async create(school: School) {
    try {
      const sql =
        "INSERT INTO schools (name, cnpj, email, phone, address) VALUES (?, ?, ?, ?, ?)";
      const query = await Database.query<ResultSetHeader>(sql, [
        school.name,
        school.cnpj,
        school.email,
        school.phone,
        school.address,
      ]);
      const findNewSchool = await this.getId(query.insertId);
      return findNewSchool;
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
      const sql = "SELECT * FROM schools WHERE id = ?";
      const query = await Database.query<School[]>(sql, [id]);
      if (query.length === 0) {
        return null;
      }
      const row = query[0];
      const mappedSchool = this.mapRowToSchool(row);
      return mappedSchool;
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
        sql = "SELECT * FROM schools WHERE state = ?;";
        statusFilter = status;
      } else if (status == 3) {
        sql = "SELECT * FROM schools;";
      }
      if (sql === "") {
        return [];
      }
      const query = await Database.query<School[]>(
        sql,
        statusFilter === 3 ? [] : [statusFilter],
      );
      if (query.length === 0) {
        return [];
      }
      const mappedSchools: School[] = query.map((school) => {
        return this.mapRowToSchool(school);
      });
      return mappedSchools;
    } catch (error: unknown) {
      console.error("Database error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido no banco de dados");
    }
  }

  async update(school: Partial<School>) {
    try {
      const findSchool = await this.getId(school.id!);
      if (!findSchool) {
        return null;
      }
      findSchool.name = school.name !== null ? school.name : findSchool.name;
      findSchool.cnpj = school.cnpj !== null ? school.cnpj : findSchool.cnpj;
      findSchool.email =
        school.email !== null ? school.email : findSchool.email;
      findSchool.phone =
        school.phone !== null ? school.phone : findSchool.phone;
      findSchool.address =
        school.address !== null ? school.address : findSchool.address;
      findSchool.state =
        school.state !== null ? school.state : findSchool.state;

      const sql = `UPDATE schools SET name = ?, cnpj = ?, email = ?, phone = ?, address = ?, state = ? WHERE id = ?`;
      const query = await Database.query<ResultSetHeader>(sql, [
        findSchool.name,
        findSchool.cnpj,
        findSchool.email,
        findSchool.phone,
        findSchool.address,
        findSchool.state,
        findSchool.id,
      ]);
      if (query.affectedRows === 0) {
        return null;
      }
      const updatedSchool = await this.getId(findSchool.id!);
      return updatedSchool;
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
      const findSchool = await this.getId(id);
      if (!findSchool) {
        return null;
      }
      const sql = "UPDATE schools SET state = 0 WHERE id = ?";
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

  private mapRowToSchool(row: any): School {
    return {
      id: row.id === undefined ? null : row.id,
      name: row.name === undefined ? null : row.name,
      cnpj: row.cnpj === undefined ? null : row.cnpj,
      email: row.email === undefined ? null : row.email,
      phone: row.phone === undefined ? null : row.phone,
      address: row.address === undefined ? null : row.address,
      state: row.state === 1 ? true : false,
      created: row.created === undefined ? null : new Date(row.created),
    };
  }
}
