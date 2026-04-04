import Database from "../database";

export async function up() {
  await Database.query(
    `CREATE TABLE medical_consultations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guide_dog_id INT NOT NULL,
    user_id INT NULL,
    consultation_date DATE NOT NULL,
    veterinarian_crmv VARCHAR(20),
    veterinarian_name VARCHAR(255),
    consultation_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_guide_dog (guide_dog_id),
    INDEX idx_user (user_id),
    CONSTRAINT fk_consultations_guide_dog
        FOREIGN KEY (guide_dog_id) REFERENCES guide_dogs(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_consultations_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE SET NULL
    );`,
  );
}

export async function down() {
  await Database.query(`DROP TABLE medical_consultations;`);
}
