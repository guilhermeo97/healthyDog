import Database from "../database";

export async function up() {
  await Database.query(
    `CREATE TABLE medications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guide_dog_id INT NOT NULL,
    user_id INT NULL,
    manufacturer VARCHAR(255),
    application_date DATE NOT NULL,
    expiration_date DATE,
    is_mandatory TINYINT(1) DEFAULT '0',
    
    veterinarian_crmv VARCHAR(20),
    veterinarian_name VARCHAR(255),
    
    medication_type ENUM('VACCINE', 'DEWORMER', 'ANTIPARASITIC') NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_guide_dog (guide_dog_id),
    INDEX idx_user (user_id),

    CONSTRAINT fk_medications_guide_dog
        FOREIGN KEY (guide_dog_id) REFERENCES guide_dogs(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_medications_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE SET NULL
    );
   `,
  );
}
