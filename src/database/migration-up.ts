import { readFileSync, readdirSync } from "fs";
import Path from "path";
import Database from "./database";

export async function migrateUp() {
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
    const sqlNames = "SELECT name FROM migrations;";
    const queryNames = await Database.query(sqlNames);

    const migrations = readdirSync(
      "/healthydog/src/database/migrations"
    ).sort();
    console.log("Migrations encontradas:", migrations);
    for (const file of migrations) {
      console.log("Verificando migração:", file.replace(".ts", ""));
      const sql = "SELECT name FROM migrations WHERE name = ?;";
      const query = await Database.query(sql, [file.replace(".ts", "")]);
      if (query.rows.length > 0) {
        console.log("Migração já aplicada:", file);
        continue;
      }
      const pasta = Path.join("./src/database/migrations", file);
      const arquivo = readFileSync(pasta, "utf-8");
      const match = [
        ...arquivo.matchAll(
          /export\s+async\s+function\s+up\(\)[\s\S]*?Database\.query\(\s*`([\s\S]*?)`/g
        ),
      ];
      const matchs = match.map((match) => match[1]);
      if (matchs.length === 0) {
        console.log(`Nenhuma query encontrada no arquivo ${file}`);
        continue;
      }
      const queries = matchs.map((e) => e?.replace(/\n/g, " ").trim());
      const result = await Database.query(queries.join(" "));
      const insertMigration =
        "INSERT INTO migrations (name, batch) VALUES (?, ?);";
      const batchNumber = queryNames.rows.length + 1;
      await Database.query(insertMigration, [
        file.replace(".ts", ""),
        batchNumber,
      ]);
      console.log("Migração aplicada:", file);
    }
  } catch (error) {
    console.error("Erro ao criar a tabela de migrações:", error);
  }
}

migrateUp();
