import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { query } from '$lib/server/db';
import bcrypt from 'bcrypt';
import type { RowDataPacket } from 'mysql2';

interface UserRow extends RowDataPacket {
  id: number;
  password_hash: string;
}

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    return json({ message: '未登录' }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await request.json();

        // 验证新旧密码不能相同
    if (currentPassword === newPassword) {
      return json({ message: '新密码不能与当前密码相同' }, { status: 400 });
    }

    // 验证当前密码
    const users = await query<UserRow[]>(
      'SELECT id, password_hash FROM users WHERE id = ?',
      [locals.user.id]
    );

    if (!users || users.length === 0) {
      return json({ message: '用户不存在' }, { status: 400 });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(currentPassword, user.password_hash);

    if (!validPassword) {
      return json({ message: '当前密码错误' }, { status: 400 });
    }

    // 更新密码
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await query(
      'UPDATE users SET password_hash = ? WHERE id = ?',
      [newPasswordHash, user.id]
    );

    return json({ message: '密码修改成功' });
  } catch (error) {
    console.error('Change password error:', error);
    return json({ message: '密码修改失败' }, { status: 500 });
  }
}; 