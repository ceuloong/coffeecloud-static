import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { pool } from '$lib/server/db';

export const POST: RequestHandler = async ({ request }) => {
  const connection = await pool.getConnection();

  try {
    const { email, subject, message } = await request.json();

    // 验证数据
    if (!email || !subject || !message) {
      return json({ message: '请填写完整信息' }, { status: 400 });
    }

    // 保存到数据库
    await connection.query(
      `INSERT INTO contact_us (email, subject, message) 
       VALUES (?, ?, ?)`,
      [email, subject, message]
    );

    return json({ message: '提交成功，我们会尽快回复您' });
  } catch (error) {
    console.error('Contact form error:', error);
    return json({ message: '提交失败，请稍后重试' }, { status: 500 });
  } finally {
    connection.release();
  }
}; 