import Database from "../database/database";
import type { Medication } from "./types/medication";
import type { ResultSetHeader } from "mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader";

export default class MedicationModel {
  constructor() {}

  async create(medication: Medication) {
    try {
      const sql =
        "INSERT INTO medications (guide_dog_id, user_id, manufacturer, application_date, expiration_date, is_mandatory, veterinarian_crmv, veterinarian_name, medication_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const query = await Database.query<ResultSetHeader>(sql, [
        medication.guideDogId,
        medication.userId,
        medication.manufacturer,
        medication.applicationDate,
        medication.expirationDate,
        medication.isMandatory,
        medication.veterinarianCrmv,
        medication.veterinarianName,
        medication.medicationType,
      ]);
      const findMedication = this.getId(query.insertId);
      return findMedication;
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
      const sql = "SELECT * FROM medications WHERE id = ?";
      const query = await Database.query<Medication[]>(sql, [id]);
      if (query.length === 0) {
        return null;
      }
      const row = query[0];
      const mappedMedication = this.mapRowToMedication(row);
      return mappedMedication;
    } catch (error: unknown) {
      console.error("Database error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido no banco de dados");
    }
  }

  async getAll() {
    try {
      const sql = "SELECT * FROM medications";
      const query = await Database.query<Medication[]>(sql);
      if (query.length === 0) {
        return [];
      }
      const mappedMedications: Medication[] = query.map((medication) => {
        return this.mapRowToMedication(medication);
      });
      return mappedMedications;
    } catch (error: unknown) {
      console.error("Database error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido no banco de dados");
    }
  }

  async update(medication: Partial<Medication>) {
    try {
      const findMedication = await this.getId(medication.id!);
      if (!findMedication) {
        return null;
      }
      findMedication.guideDogId =
        medication.guideDogId !== null
          ? medication.guideDogId
          : findMedication.guideDogId;
      findMedication.userId =
        medication.userId !== null ? medication.userId : findMedication.userId;
      findMedication.manufacturer =
        medication.manufacturer !== null
          ? medication.manufacturer
          : findMedication.manufacturer;
      findMedication.applicationDate =
        medication.applicationDate !== null
          ? medication.applicationDate
          : findMedication.applicationDate;
      findMedication.expirationDate =
        medication.expirationDate !== null
          ? medication.expirationDate
          : findMedication.expirationDate;
      findMedication.isMandatory =
        medication.isMandatory !== null
          ? medication.isMandatory
          : findMedication.isMandatory;
      findMedication.veterinarianCrmv =
        medication.veterinarianCrmv !== null
          ? medication.veterinarianCrmv
          : findMedication.veterinarianCrmv;
      findMedication.veterinarianName =
        medication.veterinarianName !== null
          ? medication.veterinarianName
          : findMedication.veterinarianName;
      findMedication.medicationType =
        medication.medicationType !== null
          ? medication.medicationType
          : findMedication.medicationType;
      const sql =
        "UPDATE medications SET guide_dog_id = ?, user_id = ?, manufacturer = ?, application_date = ?, expiration_date = ?, is_mandatory = ?, veterinarian_crmv = ?, veterinarian_name = ?, medication_type = ? WHERE id = ?";
      const query = await Database.query<ResultSetHeader>(sql, [
        findMedication.guideDogId,
        findMedication.userId,
        findMedication.manufacturer,
        findMedication.applicationDate,
        findMedication.expirationDate,
        findMedication.isMandatory,
        findMedication.veterinarianCrmv,
        findMedication.veterinarianName,
        findMedication.medicationType,
        findMedication.id,
      ]);
      if (query.affectedRows === 0) {
        return null;
      }
      const updatedMedication = await this.getId(findMedication.id!);
      return updatedMedication;
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
      const findMedication = await this.getId(id);
      if (!findMedication) {
        return null;
      }
      const sql = "DELETE FROM medications WHERE id = ?;";
      const query = await Database.query<ResultSetHeader>(sql, [id.toString()]);
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

  private mapRowToMedication(row: any): Medication {
    return {
      id: row.id === undefined ? null : row.id,
      guideDogId: row.guide_dog_id === undefined ? null : row.guide_dog_id,
      userId: row.user_id === undefined ? null : row.user_id,
      manufacturer: row.manufacturer === undefined ? null : row.manufacturer,
      applicationDate:
        row.application_date === undefined ? null : row.application_date,
      expirationDate:
        row.expiration_date === undefined ? null : row.expiration_date,
      isMandatory: row.is_mandatory === undefined ? null : row.is_mandatory,
      veterinarianCrmv:
        row.veterinarian_crmv === undefined ? null : row.veterinarian_crmv,
      veterinarianName:
        row.veterinarian_name === undefined ? null : row.veterinarian_name,
      medicationType:
        row.medication_type === undefined ? null : row.medication_type,
      createdAt: row.created_at === undefined ? null : row.created_at,
      updatedAt: row.updated_at === undefined ? null : row.updated_at,
    };
  }
}
