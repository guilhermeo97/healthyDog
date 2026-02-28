import Database from "../database";

export async function up() {
  await Database.query(
    `CREATE TABLE schools(
        id int AUTO_INCREMENT PRIMARY KEY,
        name varchar(100) NOT NULL,
        cnpj varchar(20) NOT NULL UNIQUE KEY,
        email varchar(100) NOT NULL UNIQUE KEY,
        phone varchar(20) NOT NULL,
        address varchar(255) NOT NULL,
        state tinyint(1) DEFAULT '1',
        created datetime DEFAULT CURRENT_TIMESTAMP()
    );`
  );
}

export async function down() {
  await Database.query(`DROP TABLE schools;`);
}
