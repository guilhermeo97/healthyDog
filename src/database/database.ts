import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

class Database {
  host: string;
  user: string;
  database: string;
  password: string;
  connectionLimit: number;

  constructor(
    host: string,
    user: string,
    db: string,
    password: string,
    connectionLimit: number
  ) {
    this.host = host;
    this.user = user;
    this.database = db;
    this.password = password;
    this.connectionLimit = connectionLimit;
  }

  connect() {
    const connection = mysql.createPool({
      host: this.host,
      user: this.user,
      database: this.database,
      password: this.password,
    });
    return connection;
  }

  async query(sql: string, params?: any[]) {
    try {
      const pool = this.connect();
      const [rows, fields] = await pool.execute(sql, params);
      return { rows, fields };
    } catch (e) {
      throw new Error(`Erro ${e}`);
    }
  }
}

export default new Database(
  process.env.MYSQL_HOST as string,
  process.env.MYSQL_USERNAME as string,
  process.env.MYSQL_DATABASE as string,
  process.env.MYSQL_ROOT_PASSWORD as string,
  10
);
