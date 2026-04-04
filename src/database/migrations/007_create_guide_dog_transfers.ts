import Database from "../database";

export async function up() {
  await Database.query(
    `CREATE TABLE guide_dog_transfers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guide_dog_id INT NOT NULL,
    user_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    transfer_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_guide_dog (guide_dog_id),
    INDEX idx_user (user_id),
    CONSTRAINT fk_transfers_guide_dog
        FOREIGN KEY (guide_dog_id) REFERENCES guide_dogs(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_transfers_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
    );`,
  );
}

export async function down() {
  await Database.query(`DROP TABLE guide_dog_transfers;`);
}
