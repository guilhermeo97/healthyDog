import type { School } from "./types/school";
import Database from "../database/database";

export default class SchoolModel {
  constructor() {}
  async getAll(status: number) {
    try {
      let sql = "";
      if (status == 1 || status == 0) {
        sql = "SELECT * FROM schools WHERE state = ?;";
      } else if (status == 3) {
        sql = "SELECT * FROM schools;";
      }
      const query = await Database.query(sql, [status]);
      const rows = query.rows;
      if (rows.length === 0) {
        return null;
      }
      const schools: School[] = rows.map((school) => {
        return {
          id: school.id,
          name: school.name,
          cnpj: school.cnpj,
          email: school.email,
          phone: school.phone,
          address: school.address,
          state: school.state === 1 ? true : false,
          created: school.created,
        };
      });

      return schools;
    } catch (error) {
      throw new Error("Error fetching schools: " + error);
    }
  }

  async create(school: School) {
    try {
      const { name, cnpj, email, phone, address } = school;
      const sql =
        "INSERT INTO schools (name, cnpj, email, phone, address) VALUES (?, ?, ?, ?, ?)";
      const query = await Database.query(sql, [
        name,
        cnpj,
        email,
        phone,
        address,
      ]);
      const findNewSchool = await this.getId(query.rows.insertId);
      return findNewSchool;
    } catch (error) {
      throw new Error("Error creating school: " + error);
    }
  }

  async getId(id: number) {
    try {
      const sql = "SELECT * FROM schools WHERE id = ?";
      const query = await Database.query(sql, [id.toString()]);
      if (query.rows.length === 0) {
        return null;
      }
      const row = query.rows[0];

      const school: School = {
        id: row.id,
        name: row.name,
        cnpj: row.cnpj,
        email: row.email,
        phone: row.phone,
        address: row.address,
        state: row.state === 1 ? true : false,
        created: row.created,
      };

      return school;
    } catch (error) {
      throw new Error("Error fetching school by ID: " + error);
    }
  }

  async update(school: Partial<School>) {
    try {
      const findSchool = await this.getId(school.id!);
      if (!findSchool) {
        return null;
      }
      findSchool.name = school.name || findSchool.name;
      findSchool.cnpj = school.cnpj || findSchool.cnpj;
      findSchool.email = school.email || findSchool.email;
      findSchool.phone = school.phone || findSchool.phone;
      findSchool.address = school.address || findSchool.address;
      findSchool.state =
        school.state !== undefined ? school.state : findSchool.state;

      const sql = `UPDATE schools SET name = ?, cnpj = ?, email = ?, phone = ?, address = ?, state = ? WHERE id = ?`;
      const query = await Database.query(sql, [
        findSchool.name,
        findSchool.cnpj,
        findSchool.email,
        findSchool.phone,
        findSchool.address,
        findSchool.state,
        findSchool.id!.toString(),
      ]);
      if (query.rows.affectedRows === 0) {
        return null;
      }
      const updatedSchool = await this.getId(findSchool.id!);
      return updatedSchool;
    } catch (error) {
      throw new Error("Error updating school: " + error);
    }
  }

  async delete(id: number) {
    try {
      const findSchool = await this.getId(id);
      if (!findSchool) {
        return null;
      }
      const sql = "UPDATE schools SET state = 0 WHERE id = ?";
      const query = await Database.query(sql, [id.toString()]);
      if (query.rows.affectedRows === 0) {
        return null;
      }
      return true;
    } catch (error) {
      throw new Error("Error deleting school: " + error);
    }
  }
}
