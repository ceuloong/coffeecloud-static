import type { LayoutServerLoad } from './$types';
import { query } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

interface UserRow extends RowDataPacket {
  id: number;
  username: string;
  email: string;
}

export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.user) {
    return {
      user: null
    };
  }

  try {
    const users = await query<UserRow[]>(
      'SELECT id, username, email FROM users WHERE id = ?',
      [locals.user.id]
    );

    if (!users || users.length === 0) {
      return {
        user: null
      };
    }

    const user = users[0];
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
  } catch (error) {
    console.error('Error loading user:', error);
    return {
      user: null
    };
  }
}; 