import Database from "../database/database";
import type { GuideDog } from "./types/guide-dog";
import type { ResultSetHeader } from "mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader";

export default class GuideDogModel {
  constructor() {}

  async create(guideDog: GuideDog) {
    try {
      const sql = `INSERT INTO guide_dogs (id_escola, id_user, name, gender, breed, birth_date, death_date, retirement_date, weight) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const query = await Database.query<ResultSetHeader>(sql, [
        guideDog.schoolId,
        guideDog.userId,
        guideDog.name,
        guideDog.gender,
        guideDog.breed,
        guideDog.birthDate,
        guideDog.deathDate,
        guideDog.retirementDate,
        guideDog.weight,
      ]);
      const newGuideDogId = await this.getId(query.insertId);
      return newGuideDogId;
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
      const sql = "SELECT * FROM guide_dogs WHERE id = ?";
      const query = await Database.query<GuideDog[]>(sql, [id]);
      if (query.length === 0) {
        return null;
      }
      const row = query[0];
      const mappedGuideDog = this.mapRowToGuideDog(row);
      return mappedGuideDog;
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
      if (status === 1 || status === 0) {
        sql = "SELECT * FROM guide_dogs WHERE state = ?;";
        statusFilter = status;
      } else if (status === 3) {
        sql = "SELECT * FROM guide_dogs;";
      }
      if (sql === "") {
        return [];
      }
      const query = await Database.query<GuideDog[]>(
        sql,
        statusFilter === 3 ? [] : [statusFilter],
      );
      if (query.length === 0) {
        return [];
      }
      const mappedGuideDogs: GuideDog[] = query.map((guideDog) => {
        return this.mapRowToGuideDog(guideDog);
      });
      return mappedGuideDogs;
    } catch (error: unknown) {
      console.error("Database error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido no banco de dados");
    }
  }

  async update(guideDog: Partial<GuideDog>) {
    try {
      const findGuideDog = await this.getId(guideDog.id!);
      if (!findGuideDog) {
        return null;
      }

      findGuideDog.schoolId =
        guideDog.schoolId !== null ? guideDog.schoolId : findGuideDog.schoolId;
      findGuideDog.userId =
        guideDog.userId !== null ? guideDog.userId : findGuideDog.userId;
      findGuideDog.name =
        guideDog.name !== null ? guideDog.name : findGuideDog.name;
      findGuideDog.gender =
        guideDog.gender !== null ? guideDog.gender : findGuideDog.gender;
      findGuideDog.breed =
        guideDog.breed !== null ? guideDog.breed : findGuideDog.breed;
      findGuideDog.birthDate =
        (guideDog.birthDate as any) !== null
          ? guideDog.birthDate
          : findGuideDog.birthDate;
      findGuideDog.deathDate =
        guideDog.deathDate !== null
          ? guideDog.deathDate
          : findGuideDog.deathDate;
      findGuideDog.retirementDate =
        guideDog.retirementDate !== null
          ? guideDog.retirementDate
          : findGuideDog.retirementDate;
      findGuideDog.weight =
        guideDog.weight !== null ? guideDog.weight : findGuideDog.weight;
      findGuideDog.state =
        guideDog.state !== null ? guideDog.state : findGuideDog.state;

      const sql = `UPDATE guide_dogs SET id_escola = ?, id_user = ?, name = ?, gender = ?, breed = ?, birth_date = ?, death_date = ?, retirement_date = ?, weight = ?, state = ? WHERE id = ?`;
      const query = await Database.query<ResultSetHeader>(sql, [
        findGuideDog.schoolId,
        findGuideDog.userId,
        findGuideDog.name,
        findGuideDog.gender,
        findGuideDog.breed,
        findGuideDog.birthDate,
        findGuideDog.deathDate || null,
        findGuideDog.retirementDate || null,
        findGuideDog.weight,
        findGuideDog.state ? 1 : 0,
        findGuideDog.id,
      ]);

      if (query.affectedRows === 0) {
        return null;
      }
      const updatedGuideDog = await this.getId(findGuideDog.id!);
      return updatedGuideDog;
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
      const findGuideDog = await this.getId(id);
      if (!findGuideDog) {
        return null;
      }
      const sql = "UPDATE guide_dogs SET state = 0 WHERE id = ?";
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

  private mapRowToGuideDog(row: any): GuideDog {
    return {
      id: row.id === undefined ? null : row.id,
      schoolId: row.id_escola === undefined ? null : row.id_escola,
      userId: row.id_user === undefined ? null : row.id_user,
      name: row.name === undefined ? null : row.name,
      gender: row.gender === undefined ? null : row.gender,
      breed: row.breed === undefined ? null : row.breed,
      birthDate: row.birth_date === undefined ? null : row.birth_date,
      deathDate: row.death_date === undefined ? null : row.death_date,
      retirementDate:
        row.retirement_date === undefined ? null : row.retirement_date,
      weight: row.weight === undefined ? null : row.weight,
      state: row.state === 1 ? true : row.state === 0 ? false : null,
      created: row.created === undefined ? null : row.created,
    };
  }
}
