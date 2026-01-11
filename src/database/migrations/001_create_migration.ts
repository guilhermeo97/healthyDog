import Database from "../database";

export async function up() {
  await Database.query(`CREATE TABLE migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        batch INT NOT NULL,
        applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);
}

export async function down() {
  await Database.query(`DROP TABLE IF EXISTS migrations;`);
}
