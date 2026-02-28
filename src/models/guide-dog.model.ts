import Database from "../database/database";
import type { GuideDog } from "./types/guide-dog";

export default class GuideDogModel {
  constructor() {}

  async create(guideDog: GuideDog) {
    try {
      const {
        schoolId,
        userId,
        name,
        gender,
        breed,
        birthDate,
        deathDate,
        retirementDate,
        weight,
        state,
      } = guideDog;

      const sql = `INSERT INTO guide_dogs (id_escola, id_user, name, gender, breed, birth_date, death_date, retirement_date, weight, state, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const query = await Database.query(sql, [
        schoolId,
        userId,
        name,
        gender,
        breed,
        birthDate,
        deathDate || null,
        retirementDate || null,
        weight,
        state ? 1 : 0,
        new Date(),
      ]);
      return query;
    } catch (error) {
      throw new Error(`Error creating guide dog: ${error}`);
    }
  }

  async getId(id: number) {
    try {
      const sql = "SELECT * FROM guide_dogs WHERE id = ?";
      const query = await Database.query(sql, [id.toString()]);
      if (query.rows.length === 0) {
        return null;
      }
      const row = query.rows[0];

      const guideDog: GuideDog = {
        id: row.id,
        schoolId: row.id_escola,
        userId: row.id_user,
        name: row.name,
        gender: row.gender,
        breed: row.breed,
        birthDate: row.birth_date,
        deathDate: row.death_date,
        retirementDate: row.retirement_date,
        weight: row.weight,
        state: row.state === 1 ? true : false,
        created: row.created,
      };

      return guideDog;
    } catch (error) {
      throw new Error(`Error fetching guide dog by ID: ${error}`);
    }
  }

  async getAll(status: number) {
    try {
      let sql = "";
      if (status === 1 || status === 0) {
        sql = "SELECT * FROM guide_dogs WHERE state = ?;";
      } else if (status === 3) {
        sql = "SELECT * FROM guide_dogs;";
      }
      const query = await Database.query(sql, [status]);
      const rows = query.rows;

      if (rows.length === 0) {
        return null;
      }

      const dogs: GuideDog[] = rows.map((row: any) => ({
        id: row.id,
        schoolId: row.id_escola,
        userId: row.id_user,
        name: row.name,
        gender: row.gender,
        breed: row.breed,
        birthDate: row.birth_date,
        deathDate: row.death_date,
        retirementDate: row.retirement_date,
        weight: row.weight,
        state: row.state === 1 ? true : false,
        created: row.created,
      }));

      return dogs;
    } catch (error) {
      throw new Error(`Error fetching guide dogs: ${error}`);
    }
  }

  async update(guideDog: Partial<GuideDog>) {
    try {
      const find = await this.getId(guideDog.id!);
      if (!find) {
        return null;
      }

      find.schoolId = guideDog.schoolId || find.schoolId;
      find.userId = guideDog.userId || find.userId;
      find.name = guideDog.name || find.name;
      find.gender = guideDog.gender || find.gender;
      find.breed = guideDog.breed || find.breed;
      find.birthDate = (guideDog.birthDate as any) || find.birthDate;
      find.deathDate = guideDog.deathDate || find.deathDate;
      find.retirementDate = guideDog.retirementDate || find.retirementDate;
      find.weight = guideDog.weight || find.weight;
      find.state = guideDog.state !== undefined ? guideDog.state : find.state;

      const sql = `UPDATE guide_dogs SET id_escola = ?, id_user = ?, name = ?, gender = ?, breed = ?, birth_date = ?, death_date = ?, retirement_date = ?, weight = ?, state = ? WHERE id = ?`;
      const query = await Database.query(sql, [
        find.schoolId,
        find.userId,
        find.name,
        find.gender,
        find.breed,
        find.birthDate,
        find.deathDate || null,
        find.retirementDate || null,
        find.weight,
        find.state ? 1 : 0,
        find.id!.toString(),
      ]);

      if (query.rows.affectedRows === 0) {
        return null;
      }
      const updated = await this.getId(find.id!);
      return updated;
    } catch (error) {
      throw new Error(`Error updating guide dog: ${error}`);
    }
  }

  async delete(id: number) {
    try {
      const dog = await this.getId(id);
      if (!dog) {
        return null;
      }
      const sql = "UPDATE guide_dogs SET state = 0 WHERE id = ?";
      const query = await Database.query(sql, [id.toString()]);
      if (query.rows.affectedRows === 0) {
        return null;
      }
      return true;
    } catch (error) {
      throw new Error(`Error deleting guide dog: ${error}`);
    }
  }
}
