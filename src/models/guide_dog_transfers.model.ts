import Database from "../database/database";
import type { GuideDogTransfer } from "./types/guide_dog_transfers";

export default class GuideDogTransferModel {
  constructor() {}

  async create(guideDogTransfer: GuideDogTransfer) {
    try {
      const sql =
        "INSERT INTO guide_dog_transfers (guide_dog_id, user_id, start_date, end_date, transfer_reason) VALUES (?, ?, ?, ?, ?)";
      const savedGuideDogTransfer = await Database.query(sql, [
        guideDogTransfer.guideDogId,
        guideDogTransfer.userId,
        guideDogTransfer.startDate,
        guideDogTransfer.endDate || null,
        guideDogTransfer.transferReason || null,
      ]);
      const findGuideDogTransfer = await this.getId(
        savedGuideDogTransfer.rows.insertId,
      );
      return findGuideDogTransfer;
    } catch (error: Error | unknown) {
      throw new Error(
        "Error creating guide dog transfer: " + (error as Error).message,
      );
    }
  }

  async getId(id: number) {
    try {
      const sql = "SELECT * FROM guide_dog_transfers WHERE id = ?";
      const query = await Database.query(sql, [id.toString()]);
      if (query.rows.length === 0) {
        return null;
      }
      const row = query.rows[0];
      const guideDogTransfer: GuideDogTransfer = {
        id: row.id,
        guideDogId: row.guide_dog_id,
        userId: row.user_id,
        startDate: row.start_date,
        endDate: row.end_date,
        transferReason: row.transfer_reason,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
      return guideDogTransfer;
    } catch (error: Error | unknown) {
      throw new Error(
        "Error fetching guide dog transfer: " + (error as Error).message,
      );
    }
  }

  async getAll() {
    try {
      const sql = "SELECT * FROM guide_dog_transfers";
      const query = await Database.query(sql);
      const rows = query.rows;

      if (rows.length === 0) {
        return null;
      }

      const guideDogTransfers: GuideDogTransfer[] = rows.map(
        (guideDogTransfer) => {
          return {
            id: guideDogTransfer.id,
            guideDogId: guideDogTransfer.guide_dog_id,
            userId: guideDogTransfer.user_id,
            startDate: guideDogTransfer.start_date,
            endDate: guideDogTransfer.end_date,
            transferReason: guideDogTransfer.transfer_reason,
            createdAt: guideDogTransfer.created_at,
            updatedAt: guideDogTransfer.updated_at,
          };
        },
      );

      return guideDogTransfers;
    } catch (error: Error | unknown) {
      throw new Error(
        "Error fetching guide dog transfers: " + (error as Error).message,
      );
    }
  }

  async update(guideDogTransfer: Partial<GuideDogTransfer>) {
    try {
      const findGuideDogTransfer = await this.getId(guideDogTransfer.id!);
      if (!findGuideDogTransfer) {
        return null;
      }
      findGuideDogTransfer.guideDogId =
        guideDogTransfer.guideDogId || findGuideDogTransfer.guideDogId;
      findGuideDogTransfer.userId =
        guideDogTransfer.userId || findGuideDogTransfer.userId;
      findGuideDogTransfer.startDate =
        guideDogTransfer.startDate || findGuideDogTransfer.startDate;
      findGuideDogTransfer.endDate =
        guideDogTransfer.endDate || findGuideDogTransfer.endDate;
      findGuideDogTransfer.transferReason =
        guideDogTransfer.transferReason || findGuideDogTransfer.transferReason;
      findGuideDogTransfer.updatedAt =
        guideDogTransfer.updatedAt || new Date();

      const sql =
        "UPDATE guide_dog_transfers SET guide_dog_id = ?, user_id = ?, start_date = ?, end_date = ?, transfer_reason = ?, updated_at = ? WHERE id = ?";
      const query = await Database.query(sql, [
        findGuideDogTransfer.guideDogId,
        findGuideDogTransfer.userId,
        findGuideDogTransfer.startDate,
        findGuideDogTransfer.endDate || null,
        findGuideDogTransfer.transferReason || null,
        findGuideDogTransfer.updatedAt,
        findGuideDogTransfer.id,
      ]);
      if (query.rows.affectedRows === 0) {
        return null;
      }
      const updatedGuideDogTransfer = await this.getId(
        guideDogTransfer.id!,
      );
      return updatedGuideDogTransfer;
    } catch (error: Error | unknown) {
      throw new Error(
        "Error updating guide dog transfer: " + (error as Error).message,
      );
    }
  }

  async delete(id: number) {
    try {
      const findGuideDogTransfer = await this.getId(id);
      if (!findGuideDogTransfer) {
        return null;
      }
      const sql = "DELETE FROM guide_dog_transfers WHERE id = ?";
      const query = await Database.query(sql, [id.toString()]);
      if (query.rows.affectedRows === 0) {
        return null;
      }
      return true;
    } catch (error: Error | unknown) {
      throw new Error(
        "Error deleting guide dog transfer: " + (error as Error).message,
      );
    }
  }
}
