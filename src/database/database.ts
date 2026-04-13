import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

class Database {
  host: string;
  user: string;
  database: string;
  password: string;
  connectionLimit: number;
  pool: mysql.Pool;

  constructor(
    host: string,
    user: string,
    db: string,
    password: string,
    connectionLimit: number,
  ) {
    this.host = host;
    this.user = user;
    this.database = db;
    this.password = password;
    this.connectionLimit = connectionLimit;
    this.pool = this.connect();
  }

  private connect() {
    const connection = mysql.createPool({
      host: this.host,
      user: this.user,
      database: this.database,
      password: this.password,
      connectionLimit: this.connectionLimit,
    });
    return connection;
  }

  async query<T>(sql: string, params?: any[]) {
    try {
      const [rows, fields] = await this.pool.execute(sql, params);
      return rows as T;
    } catch (error: unknown) {
      console.error("Database error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido no banco de dados");
    }
  }
}

export default new Database(
  process.env.MYSQL_HOST as string,
  process.env.MYSQL_USERNAME as string,
  process.env.MYSQL_DATABASE as string,
  process.env.MYSQL_ROOT_PASSWORD as string,
  10,
);
