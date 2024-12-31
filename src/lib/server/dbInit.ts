import { query } from './db';

export async function initializeDatabase() {
  try {
    // 创建用户表
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        verify_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_username (username)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 创建实名认证表
    await query(`
      CREATE TABLE IF NOT EXISTS user_verifications (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        real_name VARCHAR(50) NOT NULL,
        id_number VARCHAR(18) NOT NULL,
        id_front_url VARCHAR(255) NOT NULL,
        id_back_url VARCHAR(255) NOT NULL,
        status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
        reject_reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        INDEX idx_user_id (user_id),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
} 