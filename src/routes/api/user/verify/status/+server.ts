import { json } from '@sveltejs/kit';
import { query } from '$lib/server/db';
import type { RequestHandler } from './$types';
import type { VerifyStatus } from '$lib/types';

export const GET: RequestHandler = async ({ locals }) => {
  try {
    if (!locals.user?.id) {
      return json({ status: 'none' });
    }

    const [result] = await query<[{ verify_status: VerifyStatus, status: number }]>(
      `SELECT u.status, v.status as verify_status, v.real_name, v.created_at
        FROM users u 
        LEFT JOIN user_verifications v ON u.id = v.user_id AND v.deleted_at IS NULL
        WHERE u.id = ? ORDER BY v.created_at DESC limit 1`,
        [locals.user.id]
    );

    return json({
      status: result?.verify_status || 'none',
      userStatus: result?.status || 0
    });

  } catch (error) {
    console.error('Error fetching verify status:', error);
    return json(
      { message: 'Failed to fetch verification status' },
      { status: 500 }
    );
  }
}; 