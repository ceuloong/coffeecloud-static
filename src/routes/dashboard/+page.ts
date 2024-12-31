import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
  const { user } = await parent();
  
  if (!user) {
    throw redirect(302, '/login');
  }

  // 获取认证状态
  const response = await fetch('/api/user/verify');
  const verifyData = await response.json();

  return { 
    user,
    verifyStatus: {
      status: verifyData.status || 'none',
      verifyStatus: verifyData.verifyStatus || 'pending',
      rejectReason: verifyData.rejectReason || ''
    }
  };
}; 