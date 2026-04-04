import Database from "../database/database";
import type { MedicalConsultation } from "./types/medical-consultation";

export default class MedicalConsultationModel {
  constructor() {}

  async create(medicalConsultation: MedicalConsultation) {
    try {
      const sql =
        "INSERT INTO medical_consultations (guide_dog_id, user_id, consultation_date, veterinarian_crmv, veterinarian_name, consultation_notes) VALUES (?, ?, ?, ?, ?, ?)";
      const savedMedicalConsultation = await Database.query(sql, [
        medicalConsultation.guide_dog_id,
        medicalConsultation.user_id,
        medicalConsultation.consultation_date,
        medicalConsultation.veterinarian_crmv,
        medicalConsultation.veterinarian_name,
        medicalConsultation.consultation_notes,
      ]);
      const findMedicalConsultation = this.getId(
        savedMedicalConsultation.rows.insertId,
      );
      return findMedicalConsultation;
    } catch (error: Error | unknown) {
      throw new Error(
        "Error creating medical consultation: " + (error as Error).message,
      );
    }
  }
  async getId(id: number) {
    try {
      const sql = "SELECT * FROM medical_consultations WHERE id = ?";
      const query = await Database.query(sql, [id.toString()]);
      if (query.rows.length === 0) {
        return null;
      }
      const row = query.rows[0];
      const medicalConsultation: MedicalConsultation = {
        id: row.id,
        guideDogId: row.guide_dog_id,
        userId: row.user_id,
        consultationDate: row.consultation_date,
        veterinarianCrmv: row.veterinarian_crmv,
        veterinarianName: row.veterinarian_name,
        consultationNotes: row.consultation_notes,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
      return medicalConsultation;
    } catch (error: Error | unknown) {
      throw new Error(
        "Error fetching medical consultation: " + (error as Error).message,
      );
    }
  }
  async getAll() {
    try {
      const sql = "SELECT * FROM medical_consultations";
      const query = await Database.query(sql);
      const rows = query.rows;

      if (rows.length === 0) {
        return null;
      }

      const medicalConsultations: MedicalConsultation[] = rows.map(
        (medicalConsultation) => {
          return {
            id: medicalConsultation.id,
            guideDogId: medicalConsultation.guide_dog_id,
            userId: medicalConsultation.user_id,
            consultationDate: medicalConsultation.consultation_date,
            veterinarianCrmv: medicalConsultation.veterinarian_crmv,
            veterinarianName: medicalConsultation.veterinarian_name,
            consultationNotes: medicalConsultation.consultation_notes,
            createdAt: medicalConsultation.created_at,
            updatedAt: medicalConsultation.updated_at,
          };
        },
      );

      return medicalConsultations;
    } catch (error: Error | unknown) {
      throw new Error(
        "Error fetching medical consultations: " + (error as Error).message,
      );
    }
  }
  async update(medicalConsultation: Partial<MedicalConsultation>) {
    try {
      const findMedicalConsultation = await this.getId(medicalConsultation.id!);
      if (!findMedicalConsultation) {
        return null;
      }
      findMedicalConsultation.guideDogId =
        medicalConsultation.guideDogId || findMedicalConsultation.guideDogId;
      findMedicalConsultation.userId =
        medicalConsultation.userId || findMedicalConsultation.userId;
      findMedicalConsultation.consultationDate =
        medicalConsultation.consultationDate ||
        findMedicalConsultation.consultationDate;
      findMedicalConsultation.veterinarianCrmv =
        medicalConsultation.veterinarianCrmv ||
        findMedicalConsultation.veterinarianCrmv;
      findMedicalConsultation.veterinarianName =
        medicalConsultation.veterinarianName ||
        findMedicalConsultation.veterinarianName;
      findMedicalConsultation.consultationNotes =
        medicalConsultation.consultationNotes ||
        findMedicalConsultation.consultationNotes;
      findMedicalConsultation.updatedAt =
        medicalConsultation.updatedAt || new Date();
      console.log(findMedicalConsultation);
      const sql =
        "UPDATE medical_consultations SET guide_dog_id = ?, user_id = ?, consultation_date = ?, veterinarian_crmv = ?, veterinarian_name = ?, consultation_notes = ?, updated_at = ? WHERE id = ?";
      const query = await Database.query(sql, [
        findMedicalConsultation.guideDogId,
        findMedicalConsultation.userId,
        findMedicalConsultation.consultationDate,
        findMedicalConsultation.veterinarianCrmv,
        findMedicalConsultation.veterinarianName,
        findMedicalConsultation.consultationNotes,
        findMedicalConsultation.updatedAt,
        findMedicalConsultation.id,
      ]);
      if (query.rows.affectedRows === 0) {
        return null;
      }
      const updatedMedicalConsultation = await this.getId(
        medicalConsultation.id!,
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
      const query = await Database.query(sql, [id.toString()]);
      if (query.rows.affectedRows === 0) {
        return null;
      }
      return true;
    } catch (error: Error | unknown) {
      throw new Error(
        "Error deleting medical consultation: " + (error as Error).message,
      );
    }
  }
}
