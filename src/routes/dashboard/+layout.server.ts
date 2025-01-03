import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { query } from '$lib/server/db';

interface UserLocals {
  id: number;
  email: string;
  username?: string;
  status: number;
  iat: number;
  exp: number;
}

export const load: LayoutServerLoad = async ({ locals }) => {
  const user = locals.user as UserLocals;
  if (!user) {
    throw redirect(302, '/login');
  }

  // 获取用户认证状态
  const verifyResult = await query<any[]>(
    'SELECT status, reject_reason FROM user_verifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
    [locals.user.id]
  );

  // 获取用户创建时间
  const userResult = await query<any[]>(
    'SELECT created_at, status FROM users WHERE id = ?',
    [locals.user.id]
  );

  const verifyStatus = {
    status: verifyResult[0]?.status || 'none',
    rejectReason: verifyResult[0]?.reject_reason || null
  };

  // 确保返回完整的用户信息
  return {
    user: {
      id: user.id,
      username: user.username || user.email.split('@')[0],
      status: userResult[0]?.status || 0,
      email: user.email,
      createdAt: userResult[0]?.created_at || new Date().toISOString()
    },
    verifyStatus
  };
}; 