import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { pool } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2/promise';

interface VerificationRow extends RowDataPacket {
  id: number;
  status: string;
}

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    return json({ message: '未登录' }, { status: 401 });
  }

  const connection = await pool.getConnection();

  try {
    const formData = await request.formData();
    const realName = formData.get('realName') as string;
    const idNumber = formData.get('idNumber') as string;
    const idFrontPath = formData.get('idFrontPath') as string;
    const idBackPath = formData.get('idBackPath') as string;

    // 验证数据
    if (!realName || !idNumber || !idFrontPath || !idBackPath) {
      return json({ message: '请填写完整信息' }, { status: 400 });
    }

    // 检查是否已提交过认证
    const [verifications] = await connection.query<VerificationRow[]>(
      'SELECT id, status FROM user_verifications WHERE user_id = ? and status != "rejected" and deleted_at IS NULL',
      [locals.user.id]
    );

    if (verifications.length > 0 && verifications[0].status === 'pending') {
      return json({ message: '您已提交认证申请，请等待审核' }, { status: 400 });
    }

    // 开始事务
    await connection.beginTransaction();

    try {
      // 保存认证信息
      await connection.query(
        `INSERT INTO user_verifications 
         (user_id, real_name, id_number, id_front_url, id_back_url) 
         VALUES (?, ?, ?, ?, ?)`,
        [locals.user.id, realName, idNumber, idFrontPath, idBackPath]
      );

      // 更新用户表的认证状态
      await connection.query(
        `UPDATE users 
         SET verify_status = 'pending' 
         WHERE id = ?`,
        [locals.user.id]
      );

      // 提交事务
      await connection.commit();

      return json({ message: '认证申请提交成功，请等待审核' });
    } catch (error) {
      // 如果出错，回滚事务
      await connection.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Verification error:', error);
    return json({ message: '认证申请提交失败' }, { status: 500 });
  } finally {
    connection.release();
  }
};

// 获取认证状态
export const GET: RequestHandler = async ({ locals }) => {
  if (!locals.user) {
    return json({ message: '未登录' }, { status: 401 });
  }

  const connection = await pool.getConnection();

  try {
    const [verifications] = await connection.query<VerificationRow[]>(
      `SELECT v.*, u.verify_status, v.reject_reason
       FROM user_verifications v 
       JOIN users u ON u.id = v.user_id 
       WHERE v.user_id = ? AND v.deleted_at IS NULL 
       ORDER BY v.created_at DESC 
       LIMIT 1`,
      [locals.user.id]
    );

    return json({
      realName: verifications[0]?.real_name || '',
      status: verifications[0]?.status || 'none',
      verifyStatus: verifications[0]?.verify_status || 'pending',
      rejectReason: verifications[0]?.reject_reason || ''
    });
  } catch (error) {
    console.error('Get verification status error:', error);
    return json({ message: '获取认证状态失败' }, { status: 500 });
  } finally {
    connection.release();
  }
}; 