import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { query } from '$lib/server/db';

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
  if (!locals.user) {
    return {};
  }

  // 检查用户状态
  const [userStatus] = await query<[{ status: number }]>(
    'SELECT status FROM users WHERE id = ?',
    [locals.user.id]
  );
  
  // 如果用户被禁用，清除 cookie 并重定向到登录页
  if (userStatus?.status === 2) {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });

    throw redirect(302, '/login');
  }

  return {
    user: {
      username: locals.user.username,
      email: locals.user.email,
      status: locals.user.status
    }
  };
}; 