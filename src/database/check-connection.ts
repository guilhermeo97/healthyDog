import Database from "../database/database";
import type { NextFunction, Request, Response } from "express";
class CheckConnectionDbController {
  async testConnection(req: Request, res: Response) {
    const valor = 1;
    let status = "";
    const query = await Database.query("SELECT ? + ?", [
      valor.toString(),
      valor.toString(),
    ]);
    if (query.rows[0]["'1' + '1'"] === 2) {
      status = "online";
    } else {
      status = "offline";
    }

    res.json({ status });
  }
}

export default new CheckConnectionDbController();
