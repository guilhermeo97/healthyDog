import Database from "../database/database";
import type { MedicalConsultation } from "./types/medical-consultation";
import type { ResultSetHeader } from "mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader";

export default class MedicalConsultationModel {
  constructor() {}

  async create(medicalConsultation: MedicalConsultation) {
    try {
      const sql =
        "INSERT INTO medical_consultations (guide_dog_id, user_id, consultation_date, veterinarian_crmv, veterinarian_name, consultation_notes) VALUES (?, ?, ?, ?, ?, ?)";
      const savedMedicalConsultation = await Database.query<ResultSetHeader>(
        sql,
        [
          medicalConsultation.guideDogId,
          medicalConsultation.userId,
          medicalConsultation.consultationDate,
          medicalConsultation.veterinarianCrmv,
          medicalConsultation.veterinarianName,
          medicalConsultation.consultationNotes,
        ],
      );
      const findMedicalConsultation = this.getId(
        savedMedicalConsultation.insertId,
      );
      return findMedicalConsultation;
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
      const sql = "SELECT * FROM medical_consultations WHERE id = ?";
      const query = await Database.query<MedicalConsultation[]>(sql, [id]);
      if (query.length === 0) {
        return null;
      }
      const row = query[0];
      const medicalConsultation: MedicalConsultation =
        this.mapRowToMedicalConsultation(row);
      return medicalConsultation;
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
      const sql = "SELECT * FROM medical_consultations";
      const query = await Database.query<MedicalConsultation[]>(sql);

      if (query.length === 0) {
        return [];
      }

      const medicalConsultations: MedicalConsultation[] = query.map(
        (medicalConsultation) => {
          return this.mapRowToMedicalConsultation(medicalConsultation);
        },
      );
      return medicalConsultations;
    } catch (error: unknown) {
      console.error("Database error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido no banco de dados");
    }
  }

  async update(medicalConsultation: Partial<MedicalConsultation>) {
    try {
      const findMedicalConsultation = await this.getId(medicalConsultation.id!);
      if (!findMedicalConsultation) {
        return null;
      }
      findMedicalConsultation.guideDogId =
        medicalConsultation.guideDogId !== null
          ? medicalConsultation.guideDogId
          : findMedicalConsultation.guideDogId;
      findMedicalConsultation.userId =
        medicalConsultation.userId !== null
          ? medicalConsultation.userId
          : findMedicalConsultation.userId;
      findMedicalConsultation.consultationDate =
        medicalConsultation.consultationDate !== null
          ? medicalConsultation.consultationDate
          : findMedicalConsultation.consultationDate;
      findMedicalConsultation.veterinarianCrmv =
        medicalConsultation.veterinarianCrmv !== null
          ? medicalConsultation.veterinarianCrmv
          : findMedicalConsultation.veterinarianCrmv;
      findMedicalConsultation.veterinarianName =
        medicalConsultation.veterinarianName !== null
          ? medicalConsultation.veterinarianName
          : findMedicalConsultation.veterinarianName;
      findMedicalConsultation.veterinarianName;
      findMedicalConsultation.consultationNotes =
        medicalConsultation.consultationNotes !== null
          ? medicalConsultation.consultationNotes
          : findMedicalConsultation.consultationNotes;
      findMedicalConsultation.updatedAt =
        medicalConsultation.updatedAt !== null
          ? medicalConsultation.updatedAt
          : new Date();
      const sql =
        "UPDATE medical_consultations SET guide_dog_id = ?, user_id = ?, consultation_date = ?, veterinarian_crmv = ?, veterinarian_name = ?, consultation_notes = ?, updated_at = ? WHERE id = ?";
      const query = await Database.query<ResultSetHeader>(sql, [
        findMedicalConsultation.guideDogId,
        findMedicalConsultation.userId,
        findMedicalConsultation.consultationDate,
        findMedicalConsultation.veterinarianCrmv,
        findMedicalConsultation.veterinarianName,
        findMedicalConsultation.consultationNotes,
        findMedicalConsultation.updatedAt,
        findMedicalConsultation.id,
      ]);
      if (query.affectedRows === 0) {
        return null;
      }
      const updatedMedicalConsultation = await this.getId(
        findMedicalConsultation.id!,
      );
      return updatedMedicalConsultation;
    } catch (error: Error | unknown) {
      throw new Error(
        "Error updating medical consultation: " + (error as Error).message,
      );
    }
  }

  async delete(id: number) {
    try {
      const findMedicalConsultation = await this.getId(id);
      if (!findMedicalConsultation) {
        return null;
      }
      const sql = "DELETE FROM medical_consultations WHERE id = ?";
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

  private mapRowToMedicalConsultation(row: any): MedicalConsultation {
    return {
      id: row.id === undefined ? null : row.id,
      guideDogId: row.guide_dog_id === undefined ? null : row.guide_dog_id,
      userId: row.user_id === undefined ? null : row.user_id,
      consultationDate:
        row.consultation_date === undefined
          ? null
          : new Date(row.consultation_date),
      veterinarianCrmv:
        row.veterinarian_crmv === undefined ? null : row.veterinarian_crmv,
      veterinarianName:
        row.veterinarian_name === undefined ? null : row.veterinarian_name,
      consultationNotes:
        row.consultation_notes === undefined ? null : row.consultation_notes,
      createdAt: row.created_at === undefined ? null : new Date(row.created_at),
      updatedAt: row.updated_at === undefined ? null : new Date(row.updated_at),
    };
  }
}
