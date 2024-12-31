import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from '$env/static/private';

export const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function query<T>(sql: string, values?: any[]) {
  const [rows] = await pool.execute(sql, values);
  return rows as T;
}

// 初始化数据库表
export async function initDb() {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  try {
    await query(createUsersTable);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
} 