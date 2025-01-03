import { query } from './db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import type { RowDataPacket } from 'mysql2';

interface UserRow extends RowDataPacket {
  id: number;
  username: string;
  email: string;
  password_hash: string;
}

export async function createUser(username: string, email: string, password: string) {
  // 验证用户名和邮箱是否已存在
  const existingUser = await query<UserRow[]>(
    'SELECT * FROM users WHERE username = ? OR email = ?',
    [username, email]
  );

  if (Array.isArray(existingUser) && existingUser.length > 0) {
    const field = existingUser[0].username === username ? '用户名' : '邮箱';
    throw new Error(`${field}已被使用`);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  
  try {
    const result = await query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, passwordHash]
    );
    return result;
  } catch (error: any) {
    console.error('Create user error:', error);
    throw new Error('创建用户失败');
  }
}

export async function validateUser(email: string, password: string) {
  const users = await query<UserRow[]>(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (!Array.isArray(users) || users.length === 0) {
    throw new Error('用户不存在');
  }

  const user = users[0];
  const validPassword = await bcrypt.compare(password, user.password_hash);
  
  if (!validPassword) {
    throw new Error('密码错误');
  }

  if (user.status === 2) {
    throw new Error('用户已被禁用');
  }

  const token = jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username,
    status: user.status
  }, JWT_SECRET, { expiresIn: '7d' });

  return {
    user: {
      id: user.id,
      username: user.username,
      status: user.status,
      email: user.email,
      isLoggedIn: true
    },
    token
  };
} 