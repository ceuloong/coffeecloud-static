import { json } from '@sveltejs/kit';
import { query } from '$lib/server/db';
import type { RequestHandler } from './$types';
import type { VerifyStatus } from '$lib/types';

export const GET: RequestHandler = async ({ locals }) => {
  try {
    if (!locals.user?.id) {
      return json({ status: 'none' });
    }

    const [result] = await query<[{ verify_status: VerifyStatus }]>(
      'SELECT verify_status FROM users WHERE id = ?',
      [locals.user.id]
    );

    return json({
      status: result?.verify_status || 'none'
    });

  } catch (error) {
    console.error('Error fetching verify status:', error);
    return json(
      { message: 'Failed to fetch verification status' },
      { status: 500 }
    );
  }
}; 