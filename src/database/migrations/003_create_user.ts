import Database from "../database";

export async function up() {
  await Database.query(
    `CREATE TABLE users(
        id int AUTO_INCREMENT PRIMARY KEY,
        school_id int NOT NULL,
        guidedog_id int NULL,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL UNIQUE,
        password varchar(255) NOT NULL,
        cpf varchar(14) NOT NULL UNIQUE,
        birth_date date,
        type_acess enum('admin','instructor','guide_dog_user') NOT NULL,
        phone varchar(20) NOT NULL,
        address varchar(255) NOT NULL,
        state tinyint(1) DEFAULT '1',
        created datetime DEFAULT CURRENT_TIMESTAMP(),
        FOREIGN KEY (school_id) REFERENCES schools(id),
        FOREIGN KEY (guidedog_id) REFERENCES guide_dogs(id)
    );`,
  );
}

export async function down() {
  await Database.query(
    `ALTER TABLE users DROP FOREIGN KEY users_ibfk_1; ALTER TABLE users DROP FOREIGN KEY users_ibfk_2; DROP TABLE IF EXISTS users;`,
  );
}

// id,
// school,
// fullName,
// cpf,
// birthDate
// acessType,
// email,
// phone,
// password,
// guideDog,
// state,
// created
