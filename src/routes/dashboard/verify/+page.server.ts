import type { PageServerLoad } from './$types';
import { query } from '$lib/server/db';
import type { VerifyStatus } from '$lib/types';

interface UserVerifyInfo {
  verify_status: VerifyStatus;
  real_name?: string;
}

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user?.id) {
    return {
      verifyStatus: { status: 'none' as VerifyStatus },
      userStatus: 0,
      realName: null
    };
  }

  const [user] = await query<[UserVerifyInfo]>(
    `SELECT u.verify_status, v.real_name, v.created_at
     FROM users u 
     LEFT JOIN user_verifications v ON u.id = v.user_id 
     WHERE u.id = ? ORDER BY created_at DESC limit 1`,
    [locals.user.id]
  );

  // 如果已认证，处理真实姓名显示
  let displayName = null;
  if (user?.verify_status === 'verified' && user?.real_name) {
    displayName = user.real_name.charAt(0) + '*'.repeat(user.real_name.length - 1);
  }

  return {
    verifyStatus: { status: user?.verify_status || 'none' },
    userStatus: locals.user.status,
    realName: displayName
  };
}; 