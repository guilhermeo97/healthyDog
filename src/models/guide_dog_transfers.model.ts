import Database from "../database/database";
import type { GuideDogTransfer } from "./types/guide_dog_transfers";
import type { ResultSetHeader } from "mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader";

export default class GuideDogTransferModel {
  constructor() {}

  async create(guideDogTransfer: GuideDogTransfer) {
    try {
      const sql =
        "INSERT INTO guide_dog_transfers (guide_dog_id, user_id, start_date, end_date, transfer_reason) VALUES (?, ?, ?, ?, ?)";
      const savedGuideDogTransfer = await Database.query<ResultSetHeader>(sql, [
        guideDogTransfer.guideDogId,
        guideDogTransfer.userId,
        guideDogTransfer.startDate,
        guideDogTransfer.endDate || null,
        guideDogTransfer.transferReason || null,
      ]);
      const findGuideDogTransfer = await this.getId(
        savedGuideDogTransfer.insertId,
      );
      return findGuideDogTransfer;
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
      const sql = "SELECT * FROM guide_dog_transfers WHERE id = ?";
      const query = await Database.query<GuideDogTransfer[]>(sql, [id]);
      if (query.length === 0) {
        return null;
      }
      const row = query[0];
      const guideDogTransfer: GuideDogTransfer =
        this.mapRowToGuideDogTransfer(row);
      return guideDogTransfer;
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
      const sql = "SELECT * FROM guide_dog_transfers";
      const query = await Database.query<GuideDogTransfer[]>(sql);

      if (query.length === 0) {
        return [];
      }

      const guideDogTransfers: GuideDogTransfer[] = query.map(
        (guideDogTransfer) => {
          return this.mapRowToGuideDogTransfer(guideDogTransfer);
        },
      );
      return guideDogTransfers;
    } catch (error: unknown) {
      console.error("Database error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido no banco de dados");
    }
  }

  async update(guideDogTransfer: Partial<GuideDogTransfer>) {
    try {
      const findGuideDogTransfer = await this.getId(guideDogTransfer.id!);
      if (!findGuideDogTransfer) {
        return null;
      }
      findGuideDogTransfer.guideDogId =
        guideDogTransfer.guideDogId !== null
          ? guideDogTransfer.guideDogId
          : findGuideDogTransfer.guideDogId;
      findGuideDogTransfer.userId =
        guideDogTransfer.userId !== null
          ? guideDogTransfer.userId
          : findGuideDogTransfer.userId;
      findGuideDogTransfer.startDate =
        guideDogTransfer.startDate !== null
          ? guideDogTransfer.startDate
          : findGuideDogTransfer.startDate;
      findGuideDogTransfer.endDate =
        guideDogTransfer.endDate !== null
          ? guideDogTransfer.endDate
          : findGuideDogTransfer.endDate;
      findGuideDogTransfer.transferReason =
        guideDogTransfer.transferReason !== null
          ? guideDogTransfer.transferReason
          : findGuideDogTransfer.transferReason;
      findGuideDogTransfer.updatedAt =
        guideDogTransfer.updatedAt !== null
          ? guideDogTransfer.updatedAt
          : new Date();

      const sql =
        "UPDATE guide_dog_transfers SET guide_dog_id = ?, user_id = ?, start_date = ?, end_date = ?, transfer_reason = ?, updated_at = ? WHERE id = ?";
      const query = await Database.query<ResultSetHeader>(sql, [
        findGuideDogTransfer.guideDogId,
        findGuideDogTransfer.userId,
        findGuideDogTransfer.startDate,
        findGuideDogTransfer.endDate || null,
        findGuideDogTransfer.transferReason || null,
        findGuideDogTransfer.updatedAt,
        findGuideDogTransfer.id,
      ]);
      if (query.affectedRows === 0) {
        return null;
      }
      const updatedGuideDogTransfer = await this.getId(guideDogTransfer.id!);
      return updatedGuideDogTransfer;
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
      const findGuideDogTransfer = await this.getId(id);
      if (!findGuideDogTransfer) {
        return null;
      }
      const sql = "DELETE FROM guide_dog_transfers WHERE id = ?";
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

  private mapRowToGuideDogTransfer(row: any): GuideDogTransfer {
    return {
      id: row.id === undefined ? null : row.id,
      guideDogId: row.guide_dog_id === undefined ? null : row.guide_dog_id,
      userId: row.user_id === undefined ? null : row.user_id,
      startDate: row.start_date === undefined ? null : row.start_date,
      endDate: row.end_date === undefined ? null : row.end_date,
      transferReason:
        row.transfer_reason === undefined ? null : row.transfer_reason,
      createdAt: row.created_at === undefined ? null : row.created_at,
      updatedAt: row.updated_at === undefined ? null : row.updated_at,
    };
  }
}
