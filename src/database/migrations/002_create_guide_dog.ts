import Database from "../database";

export async function up() {
  await Database.query(
    `CREATE TABLE guide_dogs(
        id int AUTO_INCREMENT PRIMARY KEY,
        id_escola int NOT NULL,
        id_user int NULL,
        name varchar(100) NOT NULL,
        gender enum('M','F') NOT NULL,
        breed varchar(100) NOT NULL,
        birth_date date NOT NULL,
        death_date date,
        retirement_date date,
        weight decimal(5,2) NOT NULL,
        state tinyint(1) DEFAULT '1',
        created datetime DEFAULT CURRENT_TIMESTAMP(),
        FOREIGN KEY (id_escola) REFERENCES schools(id)
    );`,
  );
}

export async function down() {
  await Database.query(
    `ALTER TABLE guide_dogs DROP FOREIGN KEY guide_dogs_ibfk_1; DROP TABLE IF EXISTS guide_dogs;`,
  );
}
