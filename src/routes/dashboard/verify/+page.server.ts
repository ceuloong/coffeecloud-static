import type { PageServerLoad } from './$types';
import { query } from '$lib/server/db';
import type { VerifyStatus, UserStatus } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user?.id) {
    return {
      verifyStatus: { status: 'none' as VerifyStatus },
      userStatus: 0 as UserStatus
    };
  }

  const [user] = await query<[{ status: UserStatus, verify_status: VerifyStatus }]>(
    'SELECT status, verify_status FROM users WHERE id = ?',
    [locals.user.id]
  );

  return {
    verifyStatus: { status: user.verify_status },
    userStatus: user.status
  };
}; 