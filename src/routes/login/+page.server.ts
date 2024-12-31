import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, url }) => {
  // 检查服务器端的用户状态
  if (locals.user) {
    throw redirect(302, '/dashboard');
  }

  return {
    registered: url.searchParams.get('registered') === 'true'
  };
}; 