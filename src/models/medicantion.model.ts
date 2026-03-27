import Database from "../database/database";
import type { Medication } from "./types/medication";

export default class MedicationModel {
  constructor() {}

  async create(medication: Medication) {
    try {
      const sql =
        "INSERT INTO medications (guide_dog_id, user_id, manufacturer, application_date, expiration_date, is_mandatory, veterinarian_crmv, veterinarian_name, medication_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const query = await Database.query(sql, [
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
      const findMedication = this.getId(query.rows.insertId);
      return findMedication;
    } catch (error) {
      throw new Error("Error creating school: " + error);
    }
  }

  async getId(id: number) {
    try {
      const sql = "SELECT * FROM medications WHERE id = ?";
      const query = await Database.query(sql, [id.toString()]);
      if (query.rows.length === 0) {
        return null;
      }

      const row = query.rows[0];
      const medication: Medication = {
        id: row.id,
        guideDogId: row.guide_dog_id,
        userId: row.user_id,
        manufacturer: row.manufacturer,
        applicationDate: row.application_date,
        expirationDate: row.expiration_date,
        isMandatory: row.is_mandatory,
        veterinarianCrmv: row.veterinarian_crmv,
        veterinarianName: row.veterinarian_name,
        medicationType: row.medication_type,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
      return medication;
    } catch (error) {
      throw new Error("Error fetching medication: " + error);
    }
  }

  async getAll() {
    try {
      const sql = "SELECT * FROM medications";
      const query = await Database.query(sql);
      console.log(query);
      const rows = query.rows;
      if (rows.length === 0) {
        return null;
      }
      const medications: Medication[] = rows.map((medication) => {
        return {
          id: medication.id,
          guideDogId: medication.guide_dog_id,
          userId: medication.user_id,
          manufacturer: medication.manufacturer,
          applicationDate: medication.application_date,
          expirationDate: medication.expiration_date,
          isMandatory: medication.is_mandatory,
          veterinarianCrmv: medication.veterinarian_crmv,
          veterinarianName: medication.veterinarian_name,
          medicationType: medication.medication_type,
          createdAt: medication.created_at,
          updatedAt: medication.updated_at,
        };
      });
      return medications;
    } catch (error) {
      throw new Error("Error fetching medications: " + error);
    }
  }

  async update(medication: Partial<Medication>) {
    try {
      const findMedication = await this.getId(medication.id!);
      if (!findMedication) {
        return null;
      }
      findMedication.guideDogId =
        medication.guideDogId || findMedication.guideDogId;
      findMedication.userId = medication.userId || findMedication.userId;
      findMedication.manufacturer =
        medication.manufacturer || findMedication.manufacturer;
      findMedication.applicationDate =
        medication.applicationDate || findMedication.applicationDate;
      findMedication.expirationDate =
        medication.expirationDate || findMedication.expirationDate;
      findMedication.isMandatory =
        medication.isMandatory || findMedication.isMandatory;
      findMedication.isMandatory =
        medication.isMandatory || findMedication.isMandatory;
      findMedication.veterinarianCrmv =
        medication.veterinarianCrmv || findMedication.veterinarianCrmv;
      findMedication.veterinarianName =
        medication.veterinarianName || findMedication.veterinarianName;
      findMedication.medicationType =
        medication.medicationType || findMedication.medicationType;
      console.log(findMedication);
      const sql =
        "UPDATE medications SET guide_dog_id = ?, user_id = ?, manufacturer = ?, application_date = ?, expiration_date = ?, is_mandatory = ?, veterinarian_crmv = ?, veterinarian_name = ?, medication_type = ?";
      const query = await Database.query(sql, [
        findMedication.guideDogId,
        findMedication.userId,
        findMedication.manufacturer,
        findMedication.applicationDate,
        findMedication.expirationDate,
        findMedication.isMandatory,
        findMedication.veterinarianCrmv,
        findMedication.veterinarianName,
        findMedication.medicationType,
      ]);
      if (query.rows.affectedRows === 0) {
        return null;
      }
      const updatedMedication = await this.getId(findMedication.id!);
      return updatedMedication;
    } catch (error) {
      throw new Error("Error fetching medications: " + error);
    }
  }
  async delete(id: number) {
    try {
      const findMedication = await this.getId(id);
      if (!findMedication) {
        return null;
      }
      const sql = "DELETE FROM medications WHERE id = ?;";
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
