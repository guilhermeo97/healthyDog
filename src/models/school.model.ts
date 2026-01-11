import type { School } from "./types/school";
import Database from "../database/database";

export default class SchoolModel {
  async getAll(status: number) {
    let sql = "";
    if (status == 1 || status == 0) {
      sql = "SELECT * FROM schools WHERE state = ?;";
    } else if (status == 3) {
      sql = "SELECT * FROM schools;";
    }
    const query = await Database.query(sql, [status]);
    const rows = query.rows;
    const schools: School[] = rows.map((school) => {
      const state = school.state === 1 ? true : false;
      return {
        id: school.id,
        name: school.name,
        cnpj: school.cnpj,
        email: school.email,
        phone: school.phone,
        address: school.address,
        state: state,
        created: school.created,
      };
    });
    return schools;
  }
  constructor() {}
  async create(school: School) {
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
    return query;
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
      return null;
    }
  }

  async update(school: Partial<School>) {
    const findId = await this.getId(school.id!);
    if (!findId) {
      return null;
    }
    findId.name = school.name || findId.name;
    findId.cnpj = school.cnpj || findId.cnpj;
    findId.email = school.email || findId.email;
    findId.phone = school.phone || findId.phone;
    findId.address = school.address || findId.address;

    console.log("School find: ", findId.name);
    const sql = `UPDATE schools SET name = ?, cnpj = ?, email = ?, phone = ?, address = ? WHERE id = ?`;
    const query = await Database.query(sql, [
      findId.name,
      findId.cnpj,
      findId.email,
      findId.phone,
      findId.address,
      findId.id!.toString(),
    ]);
    if (query.rows.affectedRows === 0) {
      return null;
    }
    const updatedSchool = await this.getId(findId.id!);
    return updatedSchool;
  }

  async delete(id: number) {
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
  }
}
