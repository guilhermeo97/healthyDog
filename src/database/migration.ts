import { readFileSync, readdirSync } from "fs";
import Path from "path";
import Database from "./database";

export async function migrate() {
  /*
    Verifica se a tabela de migrações existe, se não, cria-a
    Busca todos os arquivos de migração na pasta 'migrations'
    Ordena os arquivos para garantir que sejam executados na ordem correta
    Verifica quais migrações já foram aplicadas no banco de dados
    Executa as migrações pendentes
    Registra a migração como aplicada no banco de dados
    Exemplo simplificado:
  */
  try {
    const sql = `CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        batch INT NOT NULL,
        applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`;
    await Database.query(sql);
    const sqlNames = "SELECT name FROM migrations LIMIT 1;";
    const query = await Database.query(sqlNames);
    console.log(query);
    const migrations = readdirSync(
      "/healthydog/src/database/migrations"
    ).sort();
    for (const file of migrations) {
      const pasta = Path.join("./src/database/migrations", file);
      const arquivo = readFileSync(pasta, "utf-8");
      // const match = arquivo.match(/export async function up\(\) {([\s\S]*?)}/g);
      // Here you would normally execute the migration against your database
    }
  } catch (error) {
    console.error("Erro ao criar a tabela de migrações:", error);
  }
}

migrate();
