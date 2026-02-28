import Database from "../database";

export async function up() {
  await Database.query(
    `ALTER TABLE guide_dogs ADD FOREIGN KEY (id_user) REFERENCES users(id);`
  );
}

export async function down() {
  await Database.query(
    `ALTER TABLE guide_dogs DROP FOREIGN KEY guide_dogs_ibfk_2;`
  );
}
